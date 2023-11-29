import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Feedback} from "../../api/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getFeedbacks(): Promise<any> {
    // let params = new HttpParams({});
    return this.http.get<Feedback[]>(this.url + '/feedbacks', ).toPromise();
  }
}
