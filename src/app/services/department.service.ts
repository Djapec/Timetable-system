import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Department} from "../models/department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getDepartments(){
    return this.httpClient.get<Department[]>(this.apiURL + `Departments/`);
  }
}
