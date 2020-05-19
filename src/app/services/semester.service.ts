import { Injectable } from '@angular/core';
import {Semester} from "../models/semester";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  constructor(private httpClient: HttpClient) { }

  public getSemesters(){
    return this.httpClient.get<Semester[]>(environment.apiUrl + `Semesters/`);
  }
}
