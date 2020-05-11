import { Injectable } from '@angular/core';
import {Semester} from "../models/semester";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getSemesters(){
    return this.httpClient.get<Semester[]>(this.apiURL + `Semesters/`);
  }
}
