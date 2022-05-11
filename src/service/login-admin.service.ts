import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginForm} from '../model/login';
import {AccRole} from "../model/accRole";

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {
  private httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private httpClient: HttpClient) {
  }

  public loginAdmin(login: LoginForm) {
    console.log(JSON.stringify(login));
    return this.httpClient.post(
      'http://localhost:8080/api/auth/login',
      JSON.stringify(login), this.httpOptions);
  }

  public checkRoleAdmin(roles: AccRole[]): boolean {
    for (const role of roles) {
      if (role.name === 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }

  public isUserLoggedIn(): boolean {
    return Boolean(sessionStorage.getItem('token'));
  }

  public logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rolename');
  }
}
