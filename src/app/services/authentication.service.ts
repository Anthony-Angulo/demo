import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(formLogin: any) {
     return this.http.post(`${environment.apiSAP}/Account/Login`, formLogin).toPromise();
  }

  logOut() {
      localStorage.removeItem('token');
  }
}
