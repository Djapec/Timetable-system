import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../models/schedule";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private httpClient: HttpClient) { }

  public getScheduleById(scheduleId: number): Observable<Schedule>{
    return this.httpClient.get<Schedule>(environment.apiUrl + `Schedules/${scheduleId}`);
  }

  public getScheduleByDepartmentId(departmentId: number): Observable<Schedule[]>{
    return this.httpClient.get<Schedule[]>(environment.apiUrl + `Schedules/by_department?departmentId=${departmentId}`);
  }

  public getSchedules()
  {
    return this.httpClient.get<Schedule[]>(environment.apiUrl + `Schedules/all`);
  }

  public getActiveSchedules()
  {
    return this.httpClient.get<Schedule[]>(environment.apiUrl + `Schedules/`);
  }

  public postSchedule(departmentId: number, semesterId: number, name: string): Observable<Schedule> {
    return this.httpClient.post<Schedule>(environment.apiUrl + `Schedules`, { departmentId: departmentId, semesterId: semesterId, name: name }, {
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8'
      }
    });
  }

  public putSchedule(scheduleId: number, name: string, isActive: boolean): Observable<Schedule> {
    return this.httpClient.put<Schedule>(environment.apiUrl + `Schedules`, { id: scheduleId, name: name, isActive: isActive }, {
      headers: {
        'Content-Type' : 'application/json; charset=UTF-8'
      }
    });
  }
  public deleteSchedule(scheduleId: number){
    return this.httpClient.delete(environment.apiUrl + `Schedules/delete/${scheduleId}`);
  }
}
