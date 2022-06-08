import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginForm} from '../model/login';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  public headers: any | null = sessionStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.headers,
    }).set('Content-Type', 'application/json'),
  };

  constructor(private httpClient: HttpClient) {
  }

  public loginAdmin(login: LoginForm): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.httpClient.post(
      'http://localhost:8080/api/auth/login',
      JSON.stringify(login), this.httpOptions
    );
  }

  public getAccImage(url: string): Observable<any> {
    this.headers = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    const path = new FormData();
    path.set('url', url.toString());
    return this.httpClient.post(
      'http://localhost:8080/getImage/', path);
  }


  public isUserLoggedIn(): boolean {
    return Boolean(sessionStorage.getItem('token'));
  }

  public logOut() {
    sessionStorage.removeItem('idAcc');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rolename');
  }
}
