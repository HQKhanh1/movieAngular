import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginAdminService} from '../../../../service/login-admin.service';
import {LoginForm} from '../../../../model/login';
import {LoginResponse} from '../../../../model/loginRespone';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {
  checkLoginTo = false;
  submitted = false;
  loginRequest: LoginForm;
  loginResponse: LoginResponse = null;
  public loginForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private loginAdminService: LoginAdminService
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  checkLogin() {
    this.submitted = true;
    this.loginRequest = new LoginForm(this.loginForm.value.username, this.loginForm.value.password);
    this.loginAdminService.loginAdmin(this.loginRequest).subscribe((data: any) => {
      if (data != null) {
        this.loginResponse = data;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.loginResponse.accountRoleDTO.length; i++) {
          if (this.loginResponse.accountRoleDTO[i].name === 'ROLE_ADMIN') {
            sessionStorage.setItem('token', 'Bearer ' + this.loginResponse.token);
            sessionStorage.setItem('username', this.loginResponse.username);
            sessionStorage.setItem('rolename', this.loginResponse.accountRoleDTO[i].name);
            this.router.navigate(['admin/pages/movie']);
          }
        }
      }
    });
    console.log('login:', this.loginResponse.accountRoleDTO);
  }
}
