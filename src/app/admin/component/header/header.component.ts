import {Component, OnInit} from '@angular/core';
import {LoginAdminService} from '../../../../service/login-admin.service';
import {ImageModel} from '../../../../model/ImageModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  accId: number;
  accImage: ImageModel;

  constructor(private loginService: LoginAdminService, private router: Router) {
  }

  async ngOnInit() {
    if (sessionStorage.getItem('username')) {
      this.username = sessionStorage.getItem('username');
    }
    if (sessionStorage.getItem('idAcc')) {
      this.accId = Number(sessionStorage.getItem('idAcc'));
      await this.loginService.getAccImage(this.accId).toPromise().then((data: any) => {
        if (data.statusCode == null) {
          this.accImage = data;
        }
        // if (data.statusCode != null) {
        //   this.accImage = data;
        // }
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
    this.router.navigate(['admin/pages/profile']).then(r => {location.reload(); });
  }
}
