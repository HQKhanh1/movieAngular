import {AccRole} from './accRole';

export class LoginResponse {
  private username: string;
  private token: string;
  private roles: AccRole[];
  getUsername() {
    return this.username;
  }
  getToken() {
    return this.token;
  }
  getAccRole() {
    return this.roles;
  }
  constructor(username: string, token: string, roles: AccRole[]) {
    this.username = username;
    this.token = token;
    this.roles = roles;
  }
}
