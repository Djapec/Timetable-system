import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Weekday} from "../models/weekday";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeekdayService {
  constructor(private httpClient: HttpClient) { }

  public getWeekdayById(weekdayId: number){
    return this.httpClient.get<Weekday>(environment.apiUrl + `Weekdays/${weekdayId}`);
  }

  public getWeekdays(){
    return this.httpClient.get<Weekday[]>(environment.apiUrl + `Weekdays/`);
  }
}
