// token.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  verifyToken(token: string) {
    return this.http.post<any>('http://127.0.0.1:8000/api/verify-token', { token });
  }

}
