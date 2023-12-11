import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
token : string | null = null;
username : string = '';
password : string = '';


  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) { }
  login() {
    this.http.post<any>('http://127.0.0.1:8000/api/login', { username: this.username, password: this.password })
      .subscribe(response => {
        // Le JWT est dans la réponse, stockez-le dans un cookie
        const jwt = response.token
        if (jwt) {
          this.auth.storeToken(jwt);
        }else {
          if (response.error){
          const errorMess = response.error;
          }
        }
      }, error  => {
        console.error('Erreur lors de la connexion:', error);
      });
  }
  logout() {
    this.auth.logout();
  }
  isLog() : boolean  {
    console.log(this.auth.isLog())
    return this.auth.isLog()

  }
  ngOnInit() {
    if (this.auth.isLog()) {

    }
  }
}
