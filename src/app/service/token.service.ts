import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  verifyToken(token: string) {
    return this.http.post('/api/verify-token', { token });
  }
}
