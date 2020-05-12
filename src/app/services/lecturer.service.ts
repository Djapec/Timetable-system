import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lecturer} from "../models/lecturer";

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getLecturersBySubject(subjectId: number, moduleId: number, semesterId: number){
    return this.httpClient.get<Lecturer[]>(this.apiURL + `Lecturers/by_subject?subjectId=${subjectId}&moduleId=${moduleId}&semesterId=${semesterId}`);
  }

  public getLecturerById(lecturerId: number){
    return this.httpClient.get<Lecturer>(this.apiURL + `Lecturers/${lecturerId}`);
  }
}
