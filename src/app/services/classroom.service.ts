import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Classroom} from "../models/classroom";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  apiURL: string = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) { }

  public getClassrooms(){
    return this.httpClient.get<Classroom[]>(this.apiURL + `Classrooms/`);
  }
}
