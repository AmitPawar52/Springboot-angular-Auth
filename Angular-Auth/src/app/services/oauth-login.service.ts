import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../constants';

export const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class OauthLoginService {

  constructor(private http: HttpClient) { }

  basicJwtAuthLogin(user) {
    return this.http.post<any>(API_BASE_URL + '/auth/login', user).pipe(
      map(
        data => {
          localStorage.setItem(TOKEN, `Bearer ${data.accessToken}`)
          return data;
        }
      )
    )
  }

  userSignup(user) {
    return this.http.post<any>(API_BASE_URL + '/auth/signup', user);
  }

  getVerificationLink(email) {
    return this.http.post<any>(API_BASE_URL + '/auth/send-email', email);
  }

  getOtp(user) {
    return this.http.post<any>(API_BASE_URL + '/auth/generate-otp', user);
  }

  getAuthToken() {
    if(localStorage.getItem(TOKEN))
      return localStorage.getItem(TOKEN)
  }
  setAuthToken(token) {
    localStorage.setItem(TOKEN, token);
  }
  isUserLoggedIn() {
    let token = localStorage.getItem(TOKEN)
    return !(token === null)
  }
  removeToken() {
    localStorage.removeItem(TOKEN)
  }
}
