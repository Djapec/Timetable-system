import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ScheduleService} from "../../services/schedule.service";
import {MatTableDataSource} from "@angular/material/table";
import {Title} from "@angular/platform-browser";
import {Schedule} from "../../models/schedule";
import {MatSort} from "@angular/material/sort";

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

  state: boolean;
  displayedColumns: string[] = ['changed', 'semester','updatedAt', 'view'];

  constructor(private sidenavToggleService: SidenavToggleService,
              private scheduleService: ScheduleService,
              private title: Title) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }

  ngOnInit(): void {
    this.title.setTitle(`Schedules - Admin - Timetable App`);
    this.scheduleService.getScheduleByDepartmentId(this.departmentId).subscribe((data) => {
      this.isLoading = false;
      this.dataSource.data = data;
    });
    this.changeState();
  }

  updatedSchedule(schedule: Schedule)
  {
    let currentDate = new Date();
    if((currentDate.getTime() - schedule.updatedAt) <= 3600000) {
      return {icon: "new_releases", color: "warn", text: "New schedule!"};
    }

    if((currentDate.getTime() - schedule.updatedAt) <= 86400000) {
      return {icon: "update", color: "accent", text: "Schedule is updated!"};
    }

    return {icon: "schedule", color: "primary", text: "Active schedule!"};
  }
}
