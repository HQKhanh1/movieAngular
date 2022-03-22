import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginAdminService} from '../../../../service/login-admin.service';
import {LoginForm} from '../../../../model/login';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  submitted = false;
  data = [];
  loginRequest!: LoginForm;
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
    this.loginRequest.username = this.loginForm.value.username;
    this.loginRequest.password = this.loginForm.value.password;
    this.loginAdminService.loginAdmin(this.loginRequest).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
}
