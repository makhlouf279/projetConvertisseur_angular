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
  canadianDollarAmount?: string ;
  CurrencyAmount?: string;
  selectCurrency?: Money;
  selectCurrencyIndex?: number;
  currencies: Array<Money> = [];

  constructor(service: MoneyService) {
    this.moneyService = service;
  }

  ngOnInit() {
    this.moneyService.getMoney().subscribe(
      (data: any | undefined) => {
        for (let code in data) {
          this.currencies.push(data[code]);
        }
        this.selectCurrency = this.currencies[0];
        this.selectCurrencyIndex = 0;
      })
  }

  converterMoney() {
    if (this.canadianDollarAmount != undefined && parseFloat(this.canadianDollarAmount) >= 0 && this.selectCurrency?.rate != undefined && this.selectCurrency?.rate >= 0) {
      this.CurrencyAmount = (parseFloat(this.canadianDollarAmount) * this.selectCurrency?.rate).toFixed(2);
    } else {
      this.CurrencyAmount = "0.00";
    }
    return this.CurrencyAmount;
  }

  converterMoneyInverse() {
    if (this.CurrencyAmount != undefined && parseFloat(this.CurrencyAmount) >= 0 && this.selectCurrency?.inverseRate != undefined && this.selectCurrency?.inverseRate >= 0) {
      this.canadianDollarAmount = (parseFloat(this.CurrencyAmount) * this.selectCurrency?.inverseRate).toFixed(2);
    } else {
      this.canadianDollarAmount = "0.00";
    }
    return this.canadianDollarAmount;
  }

  selectCurrencyChange(event: any) {
    this.selectCurrency = this.currencies.find(i => i.name == event.target.value);
    this.selectCurrencyIndex = this.currencies.findIndex(i => i.name == event.target.value);
  }
}
