import {Component, Input, OnInit} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {
  panelOpenState: boolean;
  state: boolean;
  constructor(private sidenavToggleService: SidenavToggleService) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = true);
  }
  ngOnInit(): void {
    this.panelOpenState = true;
    this.changeState();
  }

}
