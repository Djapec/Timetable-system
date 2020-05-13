import {Component, Input, OnInit} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ActivatedRoute} from "@angular/router";
import {TermService} from "../../services/term.service";
import {Term} from "../../models/term";
import {WeekdayService} from "../../services/weekday.service";
import {SubjectService} from "../../services/subject.service";
import {Weekday} from "../../models/weekday";
import { Subject } from "../../models/subject";
import {LecturerService} from "../../services/lecturer.service";
import {Lecturer} from "../../models/lecturer";
import {MatDialog} from "@angular/material/dialog";
import {DeleteTermDialogComponent} from "../delete-term-dialog/delete-term-dialog.component";
import {EditTermDialogComponent} from "../edit-term-dialog/edit-term-dialog.component";
import {Schedule} from "../../models/schedule";
import {ScheduleService} from "../../services/schedule.service";

class Color {id: number; color: string}

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
              public dialog: MatDialog) { }

  scheduleId: number;
  panelOpenState: boolean;
  state: boolean;
  weekday: Weekday;
  subject: Subject;
  lecturer: Lecturer;
  schedule: Schedule;
  terms: Term[];

  colors: Color[] = [
    {id: 1, color: "#5c6bc0"},
    {id: 2, color: "#8e99f3"},
    {id: 3, color: "#3f51b5"},
    {id: 4, color: "#7986cb"},
    {id: 5, color: "#aab6fe"},
    {id: 6, color: "#49599a"},
    {id: 7, color: "#9fa8da"},
    ];

  changeState() {
    this.sidenavToggleService.changeState(this.state = true);
  }
  ngOnInit(): void {
    this.panelOpenState = true;
    this.changeState();
    this.scheduleId = +this.route.snapshot.params.scheduleId;
    this.scheduleService.getScheduleById(this.scheduleId).subscribe((data) =>{
      this.schedule = data;
    });
    this.termService.getTermsByScheduleId(this.scheduleId).subscribe((data) =>
    {
      this.terms = data;
    })
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
}
