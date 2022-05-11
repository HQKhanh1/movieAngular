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
  loginResponse: LoginResponse;
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

  public checkLogin() {
    this.submitted = true;
    console.log('username', this.loginForm.value.username);
    console.log('username', this.loginForm.value.password);
    this.loginRequest = new LoginForm(this.loginForm.value.username, this.loginForm.value.password);
    this.loginAdminService.loginAdmin(this.loginRequest).subscribe(
      (data: any) => {
        if (data.username != null) {
          this.loginResponse = new LoginResponse(data.username, data.authenticationToken, data.accountRoleDTO);
          if (this.loginAdminService.checkRoleAdmin(this.loginResponse.getAccRole())) {
            sessionStorage.setItem('token', 'Bearer ' + this.loginResponse.getToken());
            sessionStorage.setItem('username', 'Bearer ' + this.loginResponse.getUsername());
            this.router.navigate(['admin/pages/movie']);
            this.checkLoginTo = true;
          } else {
            alert('Đăng nhập không thành công! Bạn không đủ quyền truy cập trang này');
          }
        } else {
          alert('Đăng nhập không thành công! Vui lòng kiểm tra lại username hoặc password');
        }
      }
    );
  }
}
