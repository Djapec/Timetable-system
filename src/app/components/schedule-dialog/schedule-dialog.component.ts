import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule";
import {SnackbarService} from "../../services/snackbar.service";
import {Department} from "../../models/department";
import {Semester} from "../../models/semester";
import {SemesterService} from "../../services/semester.service";
import {DepartmentService} from "../../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WeekdayService} from "../../services/weekday.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css']
})
export class ScheduleDialogComponent implements OnInit {
  departmentsControl = new FormControl('', Validators.required);
  semestersControl = new FormControl('', Validators.required);
  nameControl = new FormControl('', Validators.required);

  public schedule: Schedule;

  departments: Department[];
  semesters: Semester[];
  snackMessage: string;

  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService,
              private semesterService: SemesterService,
              private departmentService: DepartmentService,
              public router: Router,
              private translateService: TranslateService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    this.scheduleService.postSchedule(Number(this.departmentsControl.value), Number(this.semestersControl.value), this.nameControl.value).subscribe(
      (data) =>
    {
      this.schedule = data;
      if(this.schedule == null)
      {
        this.snackbarService.openSnackBar(this.snackMessage);
        this.dialogRef.close();
      }
      this.dialogRef.close();
      this.router.navigate(['/admin/timetable/', this.schedule.id]);
    },
      (error) => {
        this.snackbarService.openSnackBar(`${error.error}`);
      });
  }

  isFormValid(): boolean{
    return this.departmentsControl.valid && this.semestersControl.valid && this.nameControl.valid;
  }

  ngOnInit(): void {
    this.translateService.get('ERROR').subscribe((res) => this.snackMessage = res);

    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    },
      (error) => {
      this.snackbarService.openSnackBar(error);
      });

    this.semesterService.getSemesters().subscribe((data) => {
        this.semesters = data;
      },
      (error) => {
        this.snackbarService.openSnackBar(error.messageText);
      });
  }

}
