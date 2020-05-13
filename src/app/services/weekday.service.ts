import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weekday} from "../models/weekday";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeekdayService {
  apiURL: string = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) { }

  public getWeekdayById(weekdayId: number){
    return this.httpClient.get<Weekday>(this.apiURL + `Weekdays/${weekdayId}`);
  }

  public getWeekdays(){
    return this.httpClient.get<Weekday[]>(this.apiURL + `Weekdays/`);
  }
}
