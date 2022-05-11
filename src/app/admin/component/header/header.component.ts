import { Component, OnInit } from '@angular/core';
import {LoginAdminService} from '../../../../service/login-admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginAdminService) { }

  ngOnInit() {
  }
  public logout() {
    this.loginService.logOut();
    location.reload();
  }

}
