import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from "../models/department";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) { }

  public getDepartments(){
    return this.httpClient.get<Department[]>(environment.apiUrl + `Departments/`);
  }

  public getDepartmentById(departmentId: number){
    return this.httpClient.get<Department>(environment.apiUrl + `Departments/${departmentId}`);
  }
}
