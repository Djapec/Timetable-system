import {Component, Input, OnInit} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {

  constructor(private sidenavToggleService: SidenavToggleService, private route: ActivatedRoute) { }

  scheduleId: number;
  panelOpenState: boolean;
  state: boolean;

  changeState() {
    this.sidenavToggleService.changeState(this.state = true);
  }
  ngOnInit(): void {
    this.panelOpenState = true;
    this.changeState();
    this.route.paramMap.subscribe(params => {
      this.scheduleId = Number(params.get('scheduleId'));
    });
  }

}
