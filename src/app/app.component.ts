import { Money } from './../money';
import { Component } from '@angular/core';
import { MoneyService } from './money.service';
import { OnInit } from '@angular/core';
import {map} from "rxjs/operators";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'convertisseur';
  moneyservice:MoneyService;
  montant?:number=1;
  statut:boolean=true;
  stat:boolean= true;
  resultat?:number=1;
  selectCurency?: Money;


   map: Map<string, Money> = new Map<string, Money>();
// injection de service
  constructor(service:MoneyService){
    this.moneyservice=service;
  }

  // appelle de la methode service
  ngOnInit(){
    this.moneyservice.getMoney().subscribe(
      (data: any | undefined) =>{
        for (let code in data) {
          this.map.set(data[code].name, data[code]);
        }
      })
  }

  changerDirection(){
    if(this.statut=!this.statut){
        this.stat=false;
    }else
        this.stat=true;

  }

  convertirMoney(){
    if(this.montant!=undefined&& this.montant>=0 &&this.selectCurency?.rate!=undefined&& this.selectCurency?.rate>=0){
      this.resultat=this.montant*this.selectCurency?.rate;
    }else {
      this.resultat=0;
    }
      return this.resultat;

  }

  convertirMoneyInverse(){
    if(this.resultat!=undefined&& this.resultat>=0 &&this.selectCurency?.inverseRate!=undefined&& this.selectCurency?.inverseRate>=0){
      this.montant=this.resultat*this.selectCurency?.inverseRate;
    }else {
      this.montant=0;
    }
      return this.montant;

  }

  selectCurenecy(event: any) {
   this.selectCurency = this.map.get(event.target.value);
  }
}
