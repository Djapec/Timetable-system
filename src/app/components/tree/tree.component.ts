import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {TermDialogComponent} from "../term-dialog/term-dialog.component";
import {ModuleService} from "../../services/module.service";
import {Module} from "../../models/module";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/subject";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit{
  modules: Module[];
  subjects: Subject[];
  schedule: Schedule;
  scheduleId: number;
  panelOpenState = false;
  constructor(public dialog: MatDialog,
              private moduleService: ModuleService,
              private subjectService: SubjectService,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.scheduleId = +this.route.children[0].firstChild.snapshot.params.scheduleId;

    this.scheduleService.getScheduleById(this.scheduleId).subscribe((data) => {
      this.schedule = data;
      if(this.schedule === null)
      {
        this.snackbarService.openSnackBar(`Schedule with id ${this.scheduleId} don\'t exist!`);
      }
      this.moduleService.getModulesByDepartmentId(this.schedule.departmentId).subscribe((data)=>{
        this.modules = data;
      });
    },
      (error) => {
      this.snackbarService.openSnackBar(error.message);
      this.router.navigate(['../admin/'])
      });
  }

  getSubjects(semesterId: number, moduleId: number)
  {
    this.subjectService.getSubjectsByModuleIdAndDepartmentId(semesterId, moduleId).subscribe((data)=>{
      this.subjects = data;});
  }

  openDialog(subjectId: number, moduleId: number, semesterId: number, scheduleId: number) {
    this.dialog.open(TermDialogComponent, {
      data: { subjectId, moduleId, semesterId, scheduleId }
    });
  }
}
