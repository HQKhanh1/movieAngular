import {Component, DoCheck, OnInit, ChangeDetectorRef} from '@angular/core';
import {LoginAdminService} from '../../../../service/login-admin.service';
import {ImageModel} from '../../../../model/ImageModel';
import {Router} from '@angular/router';
import {AccountService} from '../../../../service/account.service';
import {Account} from '../../../../model/Account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  accId: number;
  accImage: ImageModel;
  infoAccount: Account;

  constructor(private loginService: LoginAdminService,
              private router: Router,
              private accountService: AccountService,
              private cd: ChangeDetectorRef) {
  }

  async ngOnInit() {
    if (sessionStorage.getItem('username')) {
      this.username = sessionStorage.getItem('username');
    }
    if (sessionStorage.getItem('idAcc')) {
      this.accId = Number(sessionStorage.getItem('idAcc'));

      await this.accountService.getAccount(this.accId).toPromise().then((data: any) => {
        this.infoAccount = data;
      });
      await this.loginService.getAccImage(this.accId).toPromise().then((data: any) => {
        if (data != null) {
          this.accImage = data;
        } else {
          if (this.infoAccount.gender === true) {
            this.accImage = new ImageModel('male.png', './assets/image/male.png');
          } else {
            this.accImage = new ImageModel('female.png', './assets/image/female.png');
          }
        }
      });
    }

  }

  public logout() {
    this.loginService.logOut();
    location.reload();
  }

  getImage(): string {
    return 'url("' + this.accImage.imgName + '")';
  }

  openProfilePage() {
    this.router.navigate(['admin/pages/profile']);
  }
}
