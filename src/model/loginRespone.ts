import {AccRole} from './AccRole';

export class LoginResponse {
  username: string;
  token: string;
  accountRoleDTO: AccRole[];
  getUsername() {
    return this.username;
  }
  getToken() {
    return this.token;
  }
  getAccRole() {
    return this.accountRoleDTO;
  }
  constructor(username: string, token: string, roles: AccRole[]) {
    this.username = username;
    this.token = token;
    this.accountRoleDTO = roles;
  }
}
