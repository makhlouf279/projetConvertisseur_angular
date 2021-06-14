import { Money } from './../money';
import { Component } from '@angular/core';
import { MoneyService } from './money.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'convertisseur';
  moneyservice:MoneyService;
  myMoney?:Money[];
  montant?:number=1;
  statut:boolean=true;
  stat:boolean= true;
  rate?:number=1;
  resultat?:number=1;



// injection de service
  constructor(service:MoneyService){
    this.moneyservice=service;
  }

  // appelle de la methode service
  ngOnInit(){
    this.moneyservice.getMoney().subscribe(
      (data: Money[] | undefined) =>{
        this.myMoney= data;

      })

  }
  getLesMoney(rate:Money[]){
    this.rate=2;

  }
/*
  changerDirection(){
    if(this.statut=!this.statut){
        this.stat=false;
    }else
        this.stat=true;

  }
  */

  convertirMoney(){
    if(this.montant!=undefined&& this.montant>=0 &&this.rate!=undefined&& this.rate>=0){
      this.resultat=this.montant*this.rate;
    }else {
      this.resultat=0;
    }
      return this.resultat;

  }

}
