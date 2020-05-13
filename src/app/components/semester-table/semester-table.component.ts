import {Component, Input, OnInit} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ScheduleService} from "../../services/schedule.service";
import {MatTableDataSource} from "@angular/material/table";

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
              private scheduleService: ScheduleService) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }

  ngOnInit(): void {
    this.scheduleService.getScheduleByDepartmentId(this.departmentId).subscribe((data) => {
      this.dataSource.data = data;
    });
    this.changeState();
  }

}
