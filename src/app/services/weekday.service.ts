import { Injectable } from '@angular/core';
import {Lecturer} from "../models/lecturer";
import {HttpClient} from "@angular/common/http";
import {Weekday} from "../models/weekday";

@Injectable({
  providedIn: 'root'
})
export class WeekdayService {
  apiURL: string = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) { }

  public getWeekdays(){
    return this.httpClient.get<Weekday[]>(this.apiURL + `Weekday/`);
  }
}
