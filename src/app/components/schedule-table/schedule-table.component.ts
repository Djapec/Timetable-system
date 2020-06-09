import {Component, Input, OnInit} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TermService} from "../../services/term.service";
import {Term} from "../../models/term";
import {Weekday} from "../../models/weekday";
import { Subject } from "../../models/subject";
import {Lecturer} from "../../models/lecturer";
import {MatDialog} from "@angular/material/dialog";
import {DeleteTermDialogComponent} from "../delete-term-dialog/delete-term-dialog.component";
import {EditTermDialogComponent} from "../edit-term-dialog/edit-term-dialog.component";
import {Schedule} from "../../models/schedule";
import {ScheduleService} from "../../services/schedule.service";
import {Title} from "@angular/platform-browser";
import { interval } from "rxjs";

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})
export class ScheduleTableComponent implements OnInit {

  constructor(private sidenavToggleService: SidenavToggleService,
              private route: ActivatedRoute,
              private termService: TermService,
              private scheduleService: ScheduleService,
              public dialog: MatDialog,
              private title: Title) {}

  scheduleId: number;
  panelOpenState: boolean;
  state: boolean;
  weekday: Weekday;
  subject: Subject;
  lecturer: Lecturer;
  schedule: Schedule;
  terms: Term[];
  isLoading = true;


  changeState() {
    this.sidenavToggleService.changeState(this.state = true);
  }
  ngOnInit(): void {
    this.panelOpenState = true;
    this.changeState();
    this.scheduleId = +this.route.snapshot.params.scheduleId;
    this.getData();
    this.dialog.afterAllClosed.subscribe(() => {
      this.getData();
    });

    const source = interval(1000);

    source.subscribe(() => this.getData());
  }

  getData()
  {
    this.scheduleId = +this.route.snapshot.params.scheduleId;
    this.scheduleService.getScheduleById(this.scheduleId).subscribe((data) =>{
      this.schedule = data;
      this.title.setTitle(`Schedule ${this.schedule.id} - Admin - Timetable App`);
    });
    this.termService.getTermsByScheduleId(this.scheduleId).subscribe((data) =>
    {
      this.isLoading = false;
      this.terms = data.sort(x => x.weekdayId);
    });
  }

  openDeleteDialog(termId: number): void {
    const dialogRef = this.dialog.open(DeleteTermDialogComponent, {
      data: {termId}
    });
  }

  openUpdateDialog(termId: number, subjectId: number, semesterId: number, moduleId: number, scheduleId: number): void {
    const dialogRef = this.dialog.open(EditTermDialogComponent, {
      data: {termId, subjectId, semesterId, moduleId, scheduleId}
    });
  }

  getTermClassName(term: Term): string
  {
    if(term.numberOfLectures > 0)
    {
      return "term-card-lecture";
    }
    else if(term.numberOfExercises > 0)
    {
      return "term-card-exercises";
    }
    else {
      return "term-card-lab-exercises";
    }
  }
}
