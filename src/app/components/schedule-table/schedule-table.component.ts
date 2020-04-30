import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {
  panelOpenState: boolean;

  constructor() { }

  ngOnInit(): void {
    this.panelOpenState = true;
  }

}
