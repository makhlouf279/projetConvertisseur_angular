import {Money} from './../money';
import {Component} from '@angular/core';
import {MoneyService} from './money.service';
import {OnInit} from '@angular/core';
import {map} from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'convertisseur';
  moneyService: MoneyService;
  currencyFromAmount?: string ;
  currencyToAmount?: string;
  selectFromCurrency?: string;
  selectFromCurrencyCode?: string;
  selectToCurrency?: Money;
  selectToCurrencyIndex?: number;
  currenciesFromName: Array<string> = [];
  currenciesFromMap: Map<string,string> =new Map<string, string>();
  currencies: Array<Money> = [];
  private defaultCurremcyCode = "cad";

  private defaultCurrencyName = "Canadian Dollar";

  constructor(service: MoneyService) {
    this.moneyService = service;
  }

  ngOnInit() {
    this.moneyService.getMoney(this.defaultCurremcyCode).subscribe(
      (data: any | undefined) => {
        this.currenciesFromName=[];
        this.currenciesFromName.push(this.defaultCurrencyName);
        this.currenciesFromMap.set(this.defaultCurrencyName,this.defaultCurremcyCode);
        for (let code in data) {
          this.currenciesFromName.push(data[code].name);
          this.currenciesFromMap.set(data[code].name,data[code].code);
        }
        this.currenciesFromName.sort();
        this.selectFromCurrency = this.defaultCurrencyName;
        this.selectFromCurrencyCode = this.defaultCurremcyCode;
        this.selectCurrencyFromCode( this.selectFromCurrencyCode);
      })
  }

  converterMoney() {
    if (this.currencyFromAmount != undefined && parseFloat(this.currencyFromAmount) >= 0 && this.selectToCurrency?.rate != undefined && this.selectToCurrency?.rate >= 0) {
      this.currencyToAmount = (parseFloat(this.currencyFromAmount) * this.selectToCurrency?.rate).toFixed(2);
    } else {
      this.currencyToAmount = "0.00";
    }
    return this.currencyToAmount;
  }

  converterMoneyInverse() {
    if (this.currencyToAmount != undefined && parseFloat(this.currencyToAmount) >= 0  && this.selectToCurrency?.inverseRate != undefined && this.selectToCurrency?.inverseRate >= 0) {
      this.currencyFromAmount = (parseFloat(this.currencyToAmount) * this.selectToCurrency?.inverseRate).toFixed(2);
    } else {
      this.currencyFromAmount = "0.00";
    }
    return this.currencyFromAmount;
  }

  selectCurrencyToChange(event: any) {
    this.selectToCurrency = this.currencies.find(i => i.name == event.target.value);
    this.selectToCurrencyIndex = this.currencies.findIndex(i => i.name == event.target.value);
  }

  selectCurrencyFromChange(event: any) {
    this.selectCurrencyFromCode(event.target.value);
  }

  private selectCurrencyFromCode( fromCurrencyCode: string) {
    this.selectFromCurrency = fromCurrencyCode;
    this.selectFromCurrencyCode = this.currenciesFromMap.get(fromCurrencyCode);
    this.moneyService.getMoney(this.selectFromCurrencyCode).subscribe(
      (data: any | undefined) => {
        this.currencies = [];
        for (let code in data) {
          this.currencies.push(data[code]);
        }
        this.currencies.sort((obj1,obj2)=>{
          if (obj1.name && obj2.name && obj1.name > obj2.name) {
            return 1;
          }

          if (obj1.name && obj2.name && obj1.name < obj2.name) {
            return -1;
          }

          return 0;
        });
      })
  }
}
