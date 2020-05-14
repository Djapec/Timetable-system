import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lecturer} from "../models/lecturer";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  apiURL: string = environment.production? 'https://timetable-application-5a0bd.herokuapp.com/api/' : 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getLecturersBySubject(subjectId: number, moduleId: number, semesterId: number){
    return this.httpClient.get<Lecturer[]>(this.apiURL + `Lecturers/by_subject?subjectId=${subjectId}&moduleId=${moduleId}&semesterId=${semesterId}`);
  }

  public getLecturerById(lecturerId: number){
    return this.httpClient.get<Lecturer>(this.apiURL + `Lecturers/${lecturerId}`);
  }
}
