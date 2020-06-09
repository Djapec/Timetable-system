import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Term} from "../models/term";
import {Observable} from "rxjs";
import {TermPostObject} from "../models/termPostObject";
import {TermPutObject} from "../models/termPutObject";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TermService {
  constructor(private httpClient: HttpClient) { }

  public getTermsByScheduleId(scheduleId: number){
    return this.httpClient.get<Term[]>(environment.apiUrl + `Terms/by_schedule?scheduleId=${scheduleId}`);
  }

  public getTermById(termId: number){
    return this.httpClient.get<Term>(environment.apiUrl+ `Terms/${termId}`);
  }

  public postTerm(termPostObject: TermPostObject): Observable<Term> {
    console.log(JSON.stringify(termPostObject));
    return this.httpClient.post<Term>(environment.apiUrl + `Terms/`, JSON.stringify(termPostObject), {
      headers: {
        'Content-Type' : 'application/json'
      }
    });
  }

  public putTerm(termPutObject: TermPutObject): Observable<Term> {
    console.log(JSON.stringify(termPutObject));
    return this.httpClient.put<Term>(environment.apiUrl + `Terms/`, JSON.stringify(termPutObject), {
      headers: {
        'Content-Type' : 'application/json'
      }
    });
  }

  public deleteTerm(termId: number){
    return this.httpClient.delete(environment.apiUrl + `Terms/${termId}`);
  }
}
