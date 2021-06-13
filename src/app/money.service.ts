
import { Money } from './../money';
import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoneyService {
  URL = "http://localhost:3000/money";
  http:HttpClient;

  constructor(clientHttp: HttpClient) {
    this.http = clientHttp;
   }

   getMoney():Observable<Money[]>{
     return this.http.get<Money[]>(this.URL);
   }

}
