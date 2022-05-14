import {AccRole} from './AccRole';

export class LoginResponse {
  private readonly username: string;
  private readonly token: string;
  private readonly roles: AccRole[];
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
