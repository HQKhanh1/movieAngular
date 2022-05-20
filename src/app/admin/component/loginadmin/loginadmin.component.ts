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

  async checkLogin() {
    this.submitted = true;
    this.loginRequest = new LoginForm(this.loginForm.value.username, this.loginForm.value.password);
    await this.loginAdminService.loginAdmin(this.loginRequest).toPromise().then((value: any) => {
      this.loginResponse = value;
    }, error => {
      alert('cos loi gi do');
    });
    console.log('login:', this.loginResponse);
    if (this.loginResponse != null) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.loginResponse.getAccRole().length; i++) {
        if (this.loginResponse.getAccRole()[i].getName() === 'ROLE_ADMIN') {
          sessionStorage.setItem('token', 'Bearer ' + this.loginResponse.getToken());
          sessionStorage.setItem('username', this.loginResponse.getUsername());
          sessionStorage.setItem('rolename', this.loginResponse.getAccRole()[i].getName());
          await this.router.navigate(['admin/pages/movie']);
        }
      }
    }
  }
}
