import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../models/schedule";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getScheduleById(scheduleId: number): Observable<Schedule>{
    return this.httpClient.get<Schedule>(this.apiURL + `Schedules/${scheduleId}`);
  }

  public getSchedules()
  {
    return this.httpClient.get<Schedule[]>(this.apiURL + `Schedules/`);
  }

  public postSchedule(departmentId: number, semesterId: number): Observable<Schedule> {
    return this.httpClient.post<Schedule>(this.apiURL + `Schedules`, { departmentId: departmentId, semesterId: semesterId }, {
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8'
      }
    });
  }
}
