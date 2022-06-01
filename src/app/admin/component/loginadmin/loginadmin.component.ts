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
  submitted = false;
  loginRequest: LoginForm;
  loginResponse: LoginResponse = null;
  errorMessage: string;
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
    await this.loginAdminService.loginAdmin(this.loginRequest).toPromise().then((data: any) => {
      console.log(data);
      if (data.statusCode != null) {
        this.errorMessage = data.message;
      } else {
        this.loginResponse = data;
        console.log(this.loginResponse);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.loginResponse.accountRoleDTO.length; i++) {
          if (this.loginResponse.accountRoleDTO[i].name === 'ROLE_ADMIN') {
            sessionStorage.setItem('idAcc', this.loginResponse.accId.toString());
            console.log(this.loginResponse.authenticationToken);
            sessionStorage.setItem('token', 'Bearer ' + this.loginResponse.authenticationToken);
            console.log(sessionStorage.getItem('token'));
            sessionStorage.setItem('username', this.loginResponse.username);
            sessionStorage.setItem('rolename', this.loginResponse.accountRoleDTO[i].name);
          }
        }
        if (sessionStorage.getItem('rolename') === 'ROLE_ADMIN') {
          this.router.navigate(['admin/pages/movie']).then(r => {
            location.reload();
          });
        }
      }
    }, error => {
      console.log('\n\n\n\n\nerror', error);
    });
    // console.log('login:', this.loginResponse.accountRoleDTO);
  }
}
