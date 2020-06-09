import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "../models/subject";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private httpClient: HttpClient) { }

  public getSubjectsByModuleIdAndDepartmentId(semesterId: number, moduleId: number){
    return this.httpClient.get<Subject[]>(environment.apiUrl + `Subjects/?semesterId=${semesterId}&moduleId=${moduleId}`);
  }

  public getSubjectById(subjectId: number){
    return this.httpClient.get<Subject>(environment.apiUrl + `Subjects/${subjectId}`);
  }
}
