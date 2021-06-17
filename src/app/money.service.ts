import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {
  URL = "http://localhost:8080/daily/";
  http: HttpClient;

  constructor(clientHttp: HttpClient) {
    this.http = clientHttp;
  }


  getMoney(code: string | undefined): Observable<any> {
    return this.http.get<any>(this.URL + code + ".json");
  }

}
