import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {District} from '../model/District';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  public headers: any | null = sessionStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.headers,
    }).set('Content-Type', 'application/json'),
  };

  constructor(private httpClient: HttpClient) {
  }

  getCity(): Observable<any> {
    this.headers = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.get<any>(
      'http://localhost:8080/api/address/get-all-city',
      this.httpOptions
    );
  }

  getDistrict(id: any): Observable<District[]> {
    this.headers = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.get<any>(
      'http://localhost:8080/api/address/get-district/' + id,
      this.httpOptions
    );
  }

  getTown(id: any): Observable<any> {
    this.headers = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.get<any>(
      'http://localhost:8080/api/address/get-town/' + id,
      this.httpOptions
    );
  }

  getAllByTownId(id: number): Observable<any> {
    this.headers = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'application/json'),
    };
    return this.httpClient.get<any>(
      'http://localhost:8080/api/address/getAddressByTownId/' + id,
      this.httpOptions
    );
  }
}
