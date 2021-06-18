
import { Money } from './../money';
import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoneyService {
  URL = "https://www.floatrates.com/daily/cad.json";
  http:HttpClient;

  constructor(clientHttp: HttpClient) {
    this.http = clientHttp;
   }

   getMoney():Observable<any>{
     return this.http.get<any>(this.URL);
   }

}
