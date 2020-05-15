import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../models/department";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-timetable-nav-tab',
  templateUrl: './timetable-nav-tab.component.html',
  styleUrls: ['./timetable-nav-tab.component.css']
})
export class TimetableNavTabComponent implements OnInit {

  departments: Department[];
  isLoading = true;
  state: boolean;
  constructor(private root: ActivatedRoute,
              private sidenavToggleService: SidenavToggleService,
              private departmentService: DepartmentService,
              private title: Title) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }
  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((data) =>
    {
      this.isLoading = false;
      this.departments = data;
      this.title.setTitle(`Schedules - Timetable App`);
    });
    this.changeState();
  }

}
