import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Classroom} from "../../models/classroom";
import {FormControl, Validators} from "@angular/forms";
import {Lecturer} from "../../models/lecturer";
import {Weekday} from "../../models/weekday";
import { LecturerService } from "../../services/lecturer.service";
import {WeekdayService} from "../../services/weekday.service";
import {ClassroomService} from "../../services/classroom.service";
import {Subject} from "../../models/subject";
import {SubjectService} from "../../services/subject.service";
import {TermPostObject} from "../../models/termPostObject";
import {Term} from "../../models/term";
import {TermService} from "../../services/term.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-term-dialog',
  templateUrl: './term-dialog.component.html',
  styleUrls: ['./term-dialog.component.css']
})

export class TermDialogComponent implements OnInit {
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

  termPostObject: TermPostObject;
  subject: Subject;
  term: Term;
  isLoading = true;

  numbers: number[] = [1, 2, 3, 4, 5];

  constructor(public dialogRef: MatDialogRef<TermDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public ids: any,
              private lecturerService: LecturerService,
              private weekdayService: WeekdayService,
              private classroomService: ClassroomService,
              private subjectService: SubjectService,
              private termService: TermService,
              private snackbarService: SnackbarService,
              private router: Router) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    this.termPostObject = {
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
      this.termPostObject.group = 0;
      this.termPostObject.numberOfLectures = this.numberOfLecturesTypeControl.value;
    }
    else if(this.lectureTypeControl.value == 2)
    {
      this.termPostObject.numberOfExercises = this.numberOfLecturesTypeControl.value;
    }
    else if(this.lectureTypeControl.value == 3)
    {
      this.termPostObject.numberOfLabExercises = this.numberOfLecturesTypeControl.value;
    }

    this.termService.postTerm(this.termPostObject).subscribe((data) => {
      this.term = data;
      if(this.term != null)
      {
        this.snackbarService.openSnackBar("Term added!", "Hurray!");
        location.reload();
      }
    },
      (error) => {
      this.snackbarService.openSnackBar(`${error.error} + - ${error.statusText}`);
      })
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
    this.subjectService.getSubjectById(this.ids.subjectId).subscribe((data) => {
      this.subject = data;});
    this.lecturerService.getLecturersBySubject(this.ids.subjectId,this.ids.moduleId,this.ids.semesterId).subscribe((data)=>{
      this.lecturers = data});
    this.weekdayService.getWeekdays().subscribe((data)=>{
      this.weekdays = data});
    this.classroomService.getClassrooms().subscribe((data)=>{
      this.isLoading = false;
      this.classrooms = data;});
  }

}
