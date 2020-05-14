import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weekday} from "../models/weekday";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeekdayService {
  apiURL: string = environment.production? 'https://timetable-application-5a0bd.herokuapp.com/api/' : 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) { }

  public getWeekdayById(weekdayId: number){
    return this.httpClient.get<Weekday>(this.apiURL + `Weekdays/${weekdayId}`);
  }

  public getWeekdays(){
    return this.httpClient.get<Weekday[]>(this.apiURL + `Weekdays/`);
  }
}
