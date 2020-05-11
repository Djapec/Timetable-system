import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../models/schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getScheduleById(scheduleId: number){
    return this.httpClient.get<Schedule>(this.apiURL + `Schedules/${scheduleId}`);
  }
  public postSchedule(departmentId: number, semesterId: number) {
    return this.httpClient.post<Schedule>(this.apiURL + `Schedules`, { departmentId: departmentId, semesterId: semesterId }, {
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8'
      }
    });
  }

}
