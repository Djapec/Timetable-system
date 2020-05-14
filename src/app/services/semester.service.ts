import { Injectable } from '@angular/core';
import {Semester} from "../models/semester";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  apiURL: string = environment.production? 'https://timetable-application-5a0bd.herokuapp.com/api/' : 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getSemesters(){
    return this.httpClient.get<Semester[]>(this.apiURL + `Semesters/`);
  }
}
