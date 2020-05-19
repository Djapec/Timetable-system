import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../models/schedule";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  apiURL: string = environment.production? 'https://timetable-application-5a0bd.herokuapp.com/api/' : 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getScheduleById(scheduleId: number): Observable<Schedule>{
    return this.httpClient.get<Schedule>(this.apiURL + `Schedules/${scheduleId}`);
  }

  public getScheduleByDepartmentId(departmentId: number): Observable<Schedule[]>{
    return this.httpClient.get<Schedule[]>(this.apiURL + `Schedules/by_department?departmentId=${departmentId}`);
  }

  public getSchedules()
  {
    return this.httpClient.get<Schedule[]>(this.apiURL + `Schedules/all`);
  }

  public getActiveSchedules()
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

  public putSchedule(scheduleId: number, name: string, isActive: boolean): Observable<Schedule> {
    return this.httpClient.put<Schedule>(this.apiURL + `Schedules`, { id: scheduleId, name: name, isActive: isActive }, {
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8'
      }
    });
  }
  public deleteSchedule(scheduleId: number){
    return this.httpClient.delete(this.apiURL + `Schedules/delete/${scheduleId}`);
  }
}
