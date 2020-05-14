import {Component, Input, OnInit} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ScheduleService} from "../../services/schedule.service";
import {MatTableDataSource} from "@angular/material/table";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-semester-table',
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.css']
})
export class SemesterTableComponent implements OnInit {
  @Input() departmentId: number;
  dataSource = new MatTableDataSource();

  state: boolean;
  displayedColumns: string[] = ['id', 'departmentId', 'semesterId', 'isActive', 'view'];

  constructor(private sidenavToggleService: SidenavToggleService,
              private scheduleService: ScheduleService,
              private title: Title) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }

  ngOnInit(): void {
    this.title.setTitle(`Schedules - Admin - Timetable App`);
    this.scheduleService.getScheduleByDepartmentId(this.departmentId).subscribe((data) => {
      this.dataSource.data = data;
    });
    this.changeState();
  }

}
