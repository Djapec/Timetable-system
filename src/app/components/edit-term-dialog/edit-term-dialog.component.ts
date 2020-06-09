import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Classroom} from "../../models/classroom";
import {Lecturer} from "../../models/lecturer";
import {Weekday} from "../../models/weekday";
import {TermPostObject} from "../../models/termPostObject";
import {Subject} from "../../models/subject";
import {Term} from "../../models/term";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LecturerService} from "../../services/lecturer.service";
import {WeekdayService} from "../../services/weekday.service";
import {ClassroomService} from "../../services/classroom.service";
import {SubjectService} from "../../services/subject.service";
import {TermService} from "../../services/term.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";
import {TermPutObject} from "../../models/termPutObject";
import {TranslateService} from "@ngx-translate/core";
import {ScheduleTableComponent} from "../schedule-table/schedule-table.component";

@Component({
  selector: 'app-edit-term-dialog',
  templateUrl: './edit-term-dialog.component.html',
  styleUrls: ['./edit-term-dialog.component.css']
})
export class EditTermDialogComponent implements OnInit {

  classroomsControl = new FormControl('', Validators.required);
  lecturersControl = new FormControl('', Validators.required);
  timepickerControl = new FormControl('', Validators.required);
  timepickerEndControl = new FormControl('', Validators.required);
  weekdayControl = new FormControl('', Validators.required);
  lectureTypeControl = new FormControl('', Validators.required);
  numberOfLecturesTypeControl = new FormControl('', Validators.required);
  groupControl = new FormControl('');

  classrooms: Classroom[];

  lecturers: Lecturer[];
  weekdays: Weekday[];

  termPutObject: TermPutObject;
  subject: Subject;
  term: Term;
  isLoading = true;
  snackMessage: string;

  numbers: number[] = [1, 2, 3, 4, 5];

  constructor(public dialogRef: MatDialogRef<EditTermDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public ids: any,
              private lecturerService: LecturerService,
              private weekdayService: WeekdayService,
              private classroomService: ClassroomService,
              private subjectService: SubjectService,
              private termService: TermService,
              private snackbarService: SnackbarService,
              private translateService: TranslateService,
              private scheduleTableComponent: ScheduleTableComponent) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    this.termPutObject = {
      id: this.ids.termId,
      numberOfLectures: 0,
      numberOfExercises: 0,
      numberOfLabExercises: 0,
      classroomId: this.classroomsControl.value,
      endTime: this.timepickerEndControl.value,
      group: this.groupControl.value,
      lecturerId: this.lecturersControl.value,
      moduleId: this.ids.moduleId,
      scheduleId: this.ids.scheduleId,
      semesterId: this.ids.semesterId,
      subjectId: this.subject.id,
      weekdayId: this.weekdayControl.value,
      startTime: this.timepickerControl.value};

    if(this.lectureTypeControl.value == 1)
    {
      this.termPutObject.group = 0;
      this.termPutObject.numberOfLectures = this.numberOfLecturesTypeControl.value;
    }
    else if(this.lectureTypeControl.value == 2)
    {
      this.termPutObject.numberOfExercises = this.numberOfLecturesTypeControl.value;
    }
    else if(this.lectureTypeControl.value == 3)
    {
      this.termPutObject.numberOfLabExercises = this.numberOfLecturesTypeControl.value;
    }

    this.termService.putTerm(this.termPutObject).subscribe((data) => {
        this.term = data;
        if(this.term != null)
        {
          this.snackbarService.openSnackBar(this.snackMessage);
        }
      },
      (error) => {
        this.snackbarService.openSnackBar(`${error.error}`);
      })
    this.scheduleTableComponent.getData();
    this.dialogRef.close();
  }

  isExercise(): void{
    if(this.lectureTypeControl.value != 1)
    {
      this.groupControl.enable();
    }
    else {
      this.groupControl.disable();
    }
  }

  isFormValid(): boolean{
    return this.classroomsControl.valid && this.lecturersControl.valid && this.timepickerControl.valid
      && this.weekdayControl.valid && this.lectureTypeControl.valid && this.numberOfLecturesTypeControl.valid;
  }

  ngOnInit(): void {
    this.translateService.get('CHANGED').subscribe((res) => this.snackMessage = res);
    this.termService.getTermById(this.ids.termId).subscribe((data) => {
      this.classroomsControl.setValue(data.classroomId);
      this.lecturersControl.setValue(data.lecturerId);
      this.timepickerControl.setValue(data.startTime);
      this.weekdayControl.setValue(data.weekdayId);
      if(data.numberOfLectures > 0)
      {
        this.lectureTypeControl.setValue('1');
      }
      else if (data.numberOfExercises > 0)
      {
        this.lectureTypeControl.setValue('2');
      }
      else
        {
          this.lectureTypeControl.setValue('3');
      }
      this.numberOfLecturesTypeControl.setValue(data.numberOfLectures);
      this.groupControl.setValue(data.group);
      this.timepickerEndControl.setValue(data.endTime);
    });

    this.subjectService.getSubjectById(this.ids.subjectId).subscribe((data) => {
      this.subject = data;});
    this.lecturerService.getLecturersBySubject(this.ids.subjectId,this.ids.moduleId,this.ids.semesterId).subscribe((data)=>{
      this.lecturers = data});
    this.weekdayService.getWeekdays().subscribe((data)=>{
      this.weekdays = data});
    this.classroomService.getClassrooms().subscribe((data)=>{
      this.isLoading = false;
      this.classrooms = data});
  }
}
