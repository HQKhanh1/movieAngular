import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  public headers: any | null = 'Bearer ' + sessionStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.headers,
    }).set('Content-Type', 'multipart/form-data'),
  };

  constructor(private httpClient: HttpClient) {
  }

  uploadImage(uploadImage: File, accId: number): Observable<any> {
    this.headers = sessionStorage.getItem('token');
    console.log(this.headers);
    // this.headers.append('Content-Type', 'multipart/form-data');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.headers,
      }).set('Content-Type', 'multipart/form-data')
    };
    console.log(this.httpOptions);
    const uploadImageData = new FormData();
    console.log(uploadImage.name);
    uploadImageData.append('image', uploadImage, uploadImage.name);
    console.log(uploadImageData);
    return this.httpClient.put('http://localhost:8080/api/acc/saveImageAccount/' + accId, uploadImageData);
  }
}
