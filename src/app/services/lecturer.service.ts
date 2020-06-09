import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lecturer} from "../models/lecturer";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  constructor(private httpClient: HttpClient) { }

  public getLecturersBySubject(subjectId: number, moduleId: number, semesterId: number){
    return this.httpClient.get<Lecturer[]>(environment.apiUrl + `Lecturers/by_subject?subjectId=${subjectId}&moduleId=${moduleId}&semesterId=${semesterId}`);
  }

  public getLecturerById(lecturerId: number){
    return this.httpClient.get<Lecturer>(environment.apiUrl + `Lecturers/${lecturerId}`);
  }
}
