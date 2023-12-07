import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Feedback, mapFeedbackToApiData} from "../../api/feedback";
import {Absence, mapAbsenceToApiData} from "../../api/absence";

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getAbsences(filters: any): Promise<any> {
    let params = new HttpParams({ fromObject: filters });
    return this.http.get<Absence[]>(this.url + '/absences', {params} ).toPromise();
  }

  saveAbsence(absence: Absence) : Promise<any> {
    absence = mapAbsenceToApiData(absence);
    return this.http.post(this.url + '/absence', {body: absence}).toPromise();
  }
}
