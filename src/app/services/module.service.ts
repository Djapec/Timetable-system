import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Module} from "../models/module";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  constructor(private httpClient: HttpClient) { }

  public getModulesByDepartmentId(departmentId: number){
    return this.httpClient.get<Module[]>(environment.apiUrl + `Modules/by_department?departmentId=${departmentId}`);
  }
}
