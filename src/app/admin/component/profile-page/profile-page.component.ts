import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {City} from '../../../../model/City';
import {District} from '../../../../model/District';
import {Town} from '../../../../model/Town';
import {AddressService} from '../../../../service/address.service';
import {NgbDateAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatePickerService} from '../../../../service/custom-date-picker.service';
import {CustomDateParseFomatterService} from '../../../../service/custom-date-parse-fomatter.service';
import {UTIL} from '../../../../util/util';

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
  maxDate: Date;
  updateAccountForm!: FormGroup;
  cities: City[] = [];
  districts: District[] = [];
  towns: Town[] = [];
  submitted = false;
  city = new FormControl('');
  district = new FormControl({value: '', disabled: true});
  town = new FormControl({value: '', disabled: true});

  constructor(private formBuilder: FormBuilder, private addressService: AddressService) {
  }

  ngOnInit() {
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.updateAccountForm = this.formBuilder.group({
      userName: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      gender: [true, Validators.required],
      birthday: ['', [Validators.required, Validators.pattern(UTIL)]],
      phoneNumber: ['']
    });

    this.addressService.getCity().toPromise().then((city: any) => {
      this.cities = city;
    });
    this.updateAccountForm.valueChanges.subscribe(() => {
      console.log(this.updateAccountForm.value.birthday);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.updateAccountForm.invalid) {
      alert('success');
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
        // console.log(this.district.disabled);
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
          // console.log(this.district.disabled);
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
        // console.log(this.district.disabled);
      }
    });
  }

  show() {
    console.log(this.updateAccountForm.value.birthday);
  }
}
