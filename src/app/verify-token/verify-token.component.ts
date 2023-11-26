import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.scss']
})
export class VerifyTokenComponent  implements OnInit {
  token: string;
  tokenIsValid: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token) {
      this.verifyToken(this.token);
    }
  }

  verifyToken(token: string) {
    this.http.post('/api/verify-token', { token }).subscribe(response => {
      // Supposons que la réponse a une propriété 'valid'
      this.tokenIsValid = response.valid;
    });
  }
}
