import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-timetable-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: []
})
export class TimetableAppComponent implements OnInit {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('rs');
  }

  ngOnInit(): void {
  }
}
