import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Option} from "../models/option"
import {HttpClient} from "@angular/common/http";
import {StyleManagerService} from "./style-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient,private styleManager: StyleManagerService) { }

  getThemeOptions(): Observable<Array<Option>> {
    return this.http.get<Array<Option>>("../../assets/options.json");
  }

  setTheme(themeToSet) {
    this.styleManager.setStyle(
      "theme",
      `../../assets/${themeToSet}.css`
    );
  }
}
