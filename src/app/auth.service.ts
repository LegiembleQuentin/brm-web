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
  storeToken(jwt: string) {
    sessionStorage.setItem('JWT', jwt);
  }
  logout() {
    sessionStorage.removeItem('JWT');
  }
}
