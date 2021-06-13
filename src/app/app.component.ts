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
  montant?:any;
  statut:boolean=true;
  stat:boolean= true;
  rate?:Money[];
  resultat?:number;



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

  getLesMoney(rate:any){
    this.rate=rate;


  }

  changerDirection(){
    if(this.statut=!this.statut){
        this.stat=false;
    }else
        this.stat=true;

  }

  convertirMoney(){
      this.resultat=<any>this.montant*<any>this.rate;
      return this.resultat;

  }

}
