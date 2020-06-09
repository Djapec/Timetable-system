import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Classroom} from "../models/classroom";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpClient: HttpClient) { }

  public getClassrooms(){
    return this.httpClient.get<Classroom[]>(environment.apiUrl + `Classrooms/`);
  }
}
