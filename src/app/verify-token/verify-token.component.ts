import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.scss']
})
export class VerifyTokenComponent  implements OnInit {
  token: string |  null = null;
  tokenIsValid: boolean = false;
  Password: string = '';
  confirmPassword: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token) {
      this.verifyToken(this.token);
    }
  }

  verifyToken(token: string) {
    this.http.post<any>('http://127.0.0.1:8000/api/verify-token', { token }).subscribe(response => {
      this.tokenIsValid = response.valid;
    }, error => {
      console.log('error')
    });
  }
  setPassword() {
    if (this.Password === this.confirmPassword) {
      this.http.post('http://127.0.0.1:8000/api/setpassword', { password: this.Password, token : this.token }).subscribe(response => {
        }, error => {
          console.error('Error', error);
        });
    } else {
      console.error('Les mots de passe ne correspondent pas.');
    }
  }
}
