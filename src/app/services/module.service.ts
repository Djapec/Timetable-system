import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Module} from "../models/module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getModulesByDepartmentId(departmentId: number){
    return this.httpClient.get<Module[]>(this.apiURL + `Modules/by_department?departmentId=${departmentId}`);
  }
}
