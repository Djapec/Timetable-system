import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Classroom} from "../models/classroom";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  apiURL: string = environment.production? 'https://timetable-application-5a0bd.herokuapp.com/api/' : 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) { }

  public getClassrooms(){
    return this.httpClient.get<Classroom[]>(this.apiURL + `Classrooms/`);
  }
}
