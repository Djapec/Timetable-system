import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Term} from "../models/term";

@Injectable({
  providedIn: 'root'
})
export class TermService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getTermsByScheduleId(scheduleId: number){
    return this.httpClient.get<Term[]>(this.apiURL + `Terms/?scheduleId=${scheduleId}`);
  }
}
