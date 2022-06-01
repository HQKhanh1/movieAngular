import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public headers: any | null = 'Bearer ' + sessionStorage.getItem('token');
  name = {name: ''};
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.headers,
    }).set('Content-Type', 'application/json'),
  };

  constructor(private httpClient: HttpClient) {
  }

  getAccount(accId: number): Observable<any> {
    this.headers = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.get('http://localhost:8080/api/acc/getAccById/' + accId, this.httpOptions);
  }

  updateAccount(account: Account): Observable<any> {
    this.headers = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.put('http://localhost:8080/api/acc/edit', JSON.stringify(account), this.httpOptions);
  }
}
