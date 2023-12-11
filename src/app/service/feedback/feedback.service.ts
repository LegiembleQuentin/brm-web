import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Feedback, mapFeedbackToApiData } from "../../api/feedback";
import { Employee, mapEmployeeToApiData } from "../../api/employee";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getFeedbacks(filters: any): Promise<any> {
    let params = new HttpParams({ fromObject: filters });
    return this.http.get<Feedback[]>(this.url + '/feedbacks', { params }).toPromise();
  }

  saveFeedback(feedback: Feedback): Promise<any> {
    feedback = mapFeedbackToApiData(feedback);
    return this.http.post(this.url + '/feedback', { body: feedback }).toPromise();
  }

  updateFeedback(feedback: Feedback): Promise<any> {
    feedback = mapFeedbackToApiData(feedback);
    return this.http.put(this.url + '/feedback', { body: feedback }).toPromise();
  }

  deleteFeedback(feedback: Feedback): Promise<any> {
    return this.http.delete(this.url + '/feedback/' + feedback.id, { body: feedback.id }).toPromise();
  }
}
