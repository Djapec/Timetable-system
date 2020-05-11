import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  apiURL: string = 'http://localhost:5000/api/';
  constructor(private httpClient: HttpClient) { }

  public getSubjectsByModuleIdAndDepartmentId(semesterId: number, moduleId: number){
    return this.httpClient.get<Subject[]>(this.apiURL + `Subjects/?semesterId=${semesterId}&moduleId=${moduleId}`);
  }

  public getSubjectById(subjectId: number){
    return this.httpClient.get<Subject>(this.apiURL + `Subjects/?subjectId=${subjectId}`);
  }
}
