import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ScheduleService} from "../../services/schedule.service";
import {MatTableDataSource} from "@angular/material/table";
import {Title} from "@angular/platform-browser";
import {Schedule} from "../../models/schedule";
import {MatSort} from "@angular/material/sort";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-semester-table',
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.css']
})
export class SemesterTableComponent implements OnInit {
  @Input() departmentId: number;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  isLoading = true;

  newSchedule: string;
  updateSchedule: string;
  activeSchedule: string;

  state: boolean;
  displayedColumns: string[] = ['changed', 'semester','updatedAt', 'view'];

  constructor(private sidenavToggleService: SidenavToggleService,
              private scheduleService: ScheduleService,
              private title: Title,
              private translateService: TranslateService) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }

  ngOnInit(): void {

    this.translateService.get('NEW SCHEDULE').subscribe((res) => this.newSchedule = res);
    this.translateService.get('UPDATE SCHEDULE').subscribe((res) => this.updateSchedule = res);
    this.translateService.get('ACTIVE SCHEDULE').subscribe((res) => this.activeSchedule = res);


    this.title.setTitle(`Schedules - Admin - Timetable App`);
    this.getData();
    this.changeState();
  }

  getData(){
    this.scheduleService.getScheduleByDepartmentId(this.departmentId).subscribe((data) => {
      this.isLoading = false;
      this.dataSource.data = data;
    });
  }

  updatedSchedule(schedule: Schedule)
  {
    let currentDate = new Date();
    if((currentDate.getTime() - schedule.createdAt) <= 3600000) {
      return {icon: "new_releases", color: "warn", text: this.newSchedule};
    }

    if((currentDate.getTime() - schedule.updatedAt) <= 86400000) {
      return {icon: "update", color: "accent", text: this.updateSchedule};
    }

    return {icon: "schedule", color: "primary", text: this.activeSchedule};
  }
}
