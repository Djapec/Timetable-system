import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: []
})
export class TimetableAppComponent implements OnInit {
  title = "Menu";
  constructor() { }

  ngOnInit(): void {
  }

}
