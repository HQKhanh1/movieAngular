import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../../../model/City';
import {District} from '../../../../model/District';
import {Town} from '../../../../model/Town';
import {AddressService} from '../../../../service/address.service';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatePickerService} from '../../../../service/custom-date-picker.service';
import {CustomDateParseFomatterService} from '../../../../service/custom-date-parse-fomatter.service';
import {UTIL} from '../../../../util/util';
import {UploadImageService} from 'src/service/upload-image.service';
import {AccountService} from 'src/service/account.service';
import {Account} from '../../../../model/Account';
import {LoginAdminService} from '../../../../service/login-admin.service';
import {ImageModel} from '../../../../model/ImageModel';
import {UtilClass} from '../../../../util/utilClass';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomDatePickerService},
    {provide: NgbDateParserFormatter, useClass: CustomDateParseFomatterService}
  ]
})

export class ProfilePageComponent implements OnInit {
  accId: number;
  maxDate: any;
  dayStart: any;
  infoAccount: Account;
  updateAccountForm!: FormGroup;
  uploadAccImage!: FormGroup;
  cities: City[] = [];
  districts: District[] = [];
  towns: Town[] = [];
  submitted = false;
  uploadImageSubmitted = false;
  city = new FormControl('');
  district = new FormControl({value: '', disabled: true});
  town = new FormControl({value: '', disabled: true});
  accImage: ImageModel = new ImageModel(UTIL.DEFAUT_ACCOUNT_IMAGE_NAME_MALE, UTIL.DEFAULT_ACCOUNT_IMAGE_URL_MALE);
  fileToUpload: File;

  constructor(private formBuilder: FormBuilder,
              private addressService: AddressService,
              private uploadImageService: UploadImageService,
              private accountService: AccountService,
              private loginService: LoginAdminService) {
    this.uploadAccImage = new FormGroup({
      accImage: new FormControl('', Validators.required)
    });
    this.updateAccountForm = new FormGroup({
      userName: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl(''),
      gender: new FormControl(true, Validators.required),
      birthday: new FormControl('', [Validators.required, Validators.pattern(UTIL.DATE_PATERN)]),
      phoneNumber: new FormControl('', Validators.pattern(UTIL.NUMBER_PHONE_PATERN))
    });
  }

  ngOnInit() {
    this.accId = +sessionStorage.getItem('idAcc');
    this.maxDate = {year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate()};
    this.getAccInfo().then(r => {
    });
    this.getCities().then(r => {
    });
  }

  async getCities() {
    await this.addressService.getCity().toPromise().then((city: any) => {
      this.cities = city;
    });
  }

  async getAddressDetail() {
    await this.addressService.getAllByTownId(this.infoAccount.town).toPromise().then((data: any) => {
      this.district.enable();
      this.town.enable();
      this.city = new FormControl(data.cityDTO.id);
      this.district = new FormControl(data.districtDTO.id);
      this.town = new FormControl(data.townDTO.id);
      this.districts = data.districtDTOS;
      this.towns = data.townDTOs;
    });
  }

  async getAccInfo() {
    await this.accountService.getAccount(this.accId).toPromise().then((data: any) => {
      this.infoAccount = data;
      this.getImgAcc().then(r => {
      });
      const date: Date = new Date(this.infoAccount.birthday);
      const month: number = date.getMonth() + 1;
      this.dayStart = date.getDate() + '-' + month + '-' + date.getFullYear();
      this.updateAccountForm = new FormGroup({
        userName: new FormControl(this.infoAccount.username, Validators.required),
        firstName: new FormControl(this.infoAccount.firstname, Validators.required),
        lastName: new FormControl(this.infoAccount.lastname, Validators.required),
        email: new FormControl(this.infoAccount.email, [Validators.required, Validators.email]),
        address: new FormControl(this.infoAccount.address),
        gender: new FormControl(this.infoAccount.gender, Validators.required),
        birthday: new FormControl(this.dayStart, [Validators.required, Validators.pattern(UTIL.DATE_PATERN)]),
        phoneNumber: new FormControl(this.infoAccount.phoneNumber, Validators.pattern(UTIL.NUMBER_PHONE_PATERN))
      });
      this.getAddressDetail().then(r => {
      });
    });
  }

  async getImgAcc() {
    await this.loginService.getAccImage(this.infoAccount.avatar).toPromise().then((data: any) => {
      if (data != null) {
        this.accImage = data;
      } else {
        if (this.infoAccount.gender === true) {
          this.accImage = new ImageModel(UTIL.DEFAUT_ACCOUNT_IMAGE_NAME_MALE, UTIL.DEFAULT_ACCOUNT_IMAGE_URL_MALE);
        } else {
          this.accImage = new ImageModel(UTIL.DEFAUT_ACCOUNT_IMAGE_NAME_FEMALE, UTIL.DEFAULT_ACCOUNT_IMAGE_URL_FEMALE);
        }
      }
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (!this.updateAccountForm.invalid) {
      this.infoAccount.firstname = this.updateAccountForm.value.firstName;
      this.infoAccount.lastname = this.updateAccountForm.value.lastName;
      this.infoAccount.address = this.updateAccountForm.value.address;
      this.infoAccount.phoneNumber = this.updateAccountForm.value.phoneNumber;
      this.infoAccount.birthday = new Date(this.updateAccountForm.value.birthday).getTime();
      this.infoAccount.email = this.updateAccountForm.value.email;
      this.infoAccount.gender = this.updateAccountForm.value.gender;
      this.infoAccount.town = this.town.value;
      console.log(this.infoAccount.gender);
      console.log(this.infoAccount);
      await this.accountService.updateAccount(this.infoAccount).toPromise().then((data: any) => {
        if (data.statusCode != null) {
          UtilClass.showMesageAlert(UTIL.ICON_ERROR, data.message);
        } else {
          UtilClass.showMesageAlert(UTIL.ICON_SUCCESS, UTIL.ALERT_MESAGE_SUCCESS_DETAIL_ACCOUNT);
        }
      });
    }
  }

  async cityChanged() {
    this.district.reset();
    this.town.reset();
    this.town.disable();
    this.district.disable();
    await this.addressService.getDistrict(this.city.value).toPromise().then(async (district: District[]) => {
      if (district) {
        this.districts.splice(0);
        for (const d of district) {
          this.districts.push(d);
        }
      }
      this.district.enable();
      this.district = new FormControl(this.districts[0].id);
      await this.addressService.getTown(this.district.value).toPromise().then((town: Town[]) => {
        if (town) {
          this.towns.splice(0);
          for (const t of town) {
            this.towns.push(t);
          }
          this.town.enable();
          this.town = new FormControl(this.towns[0].id);
        }
      });
    });
  }

  async districtChanged() {
    this.town.reset();
    this.town.disable();
    await this.addressService.getTown(this.district.value).toPromise().then((town: Town[]) => {
      if (town) {
        this.towns.splice(0);
        for (const t of town) {
          this.towns.push(t);
        }
        this.town.enable();
      }
    });
  }

  show() {
    console.log(this.updateAccountForm.value.gender);
  }

  handleFileUpload(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.accImage = new ImageModel(this.fileToUpload.name, event.target.result);
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  async uploadAccImageSubmit() {
    this.uploadImageSubmitted = true;
    if (!this.uploadAccImage.invalid) {
      await this.uploadImageService.uploadImageAcc(this.fileToUpload, this.accId).toPromise().then((data: any) => {
        UtilClass.showMesageAlert(UTIL.ICON_SUCCESS, UTIL.ALERT_MESAGE_SUCCESS_AVATAR);
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    }
  }


}
