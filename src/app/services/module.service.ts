import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Module} from "../models/module";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  apiURL: string = environment.production? 'https://timetable-application-5a0bd.herokuapp.com/api/' : 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getModulesByDepartmentId(departmentId: number){
    return this.httpClient.get<Module[]>(this.apiURL + `Modules/by_department?departmentId=${departmentId}`);
  }
}
