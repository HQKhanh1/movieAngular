import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from '../model/login';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  constructor(private httpClient: HttpClient) { }

  public loginAdmin(login: LoginForm): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/auth/login', JSON.stringify(login));
  }
}
