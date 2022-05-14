import { Component, OnInit } from '@angular/core';
import {LoginAdminService} from '../../../../service/login-admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(private loginService: LoginAdminService) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }
  public logout() {
    this.loginService.logOut();
    location.reload();
  }

}
