import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from "../models/department";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiURL: string = environment.production? 'https://timetable-application-5a0bd.herokuapp.com/api/' : 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) { }

  public getDepartments(){
    return this.httpClient.get<Department[]>(this.apiURL + `Departments/`);
  }

  public getDepartmentById(departmentId: number){
    return this.httpClient.get<Department>(this.apiURL + `Departments/${departmentId}`);
  }
}
