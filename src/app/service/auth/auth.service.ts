import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLog(): boolean {
    const jwt = sessionStorage.getItem('JWT');
    return !!jwt;
  }
  getToken() {
    const jwt = sessionStorage.getItem('JWT')
    if (jwt) {
      return jwt
    } else {
      return 'utilisateur non connecté';
    }
  }
  storeToken(jwt: string) {
    sessionStorage.setItem('JWT', jwt);
  }
  logout() {
    sessionStorage.removeItem('JWT');
  }
}
