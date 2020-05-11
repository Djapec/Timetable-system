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

@Component({
  selector: 'app-term-dialog',
  templateUrl: './term-dialog.component.html',
  styleUrls: ['./term-dialog.component.css']
})

export class TermDialogComponent implements OnInit {
  classroomsControl = new FormControl('', Validators.required);
  lecturersControl = new FormControl('', Validators.required);
  timepickerControl = new FormControl('', Validators.required);
  weekdayControl = new FormControl('', Validators.required);
  lectureTypeControl = new FormControl('', Validators.required);
  numberOfLecturesTypeControl = new FormControl('', Validators.required);

  classrooms: Classroom[];

  lecturers: Lecturer[];
  weekdays: Weekday[];

  subject: Subject;

  numbers: number[] = [1, 2, 3, 4, 5];

  constructor(public dialogRef: MatDialogRef<TermDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public subjectId: number,
              @Inject(MAT_DIALOG_DATA) public moduleId: number,
              @Inject(MAT_DIALOG_DATA) public semesterId: number,
              private lecturerService: LecturerService,
              private weekdayService: WeekdayService,
              private classroomService: ClassroomService,
              private subjectService: SubjectService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void{
    this.dialogRef.close();
  }

  isFormValid(): boolean{
    return this.classroomsControl.valid && this.lecturersControl.valid && this.timepickerControl.valid
      && this.weekdayControl.valid && this.lectureTypeControl.valid && this.numberOfLecturesTypeControl.valid;
  }

  ngOnInit(): void {
    this.subjectService.getSubjectById(this.subjectId).subscribe((data) => {
      this.subject = data;});
    this.lecturerService.getLecturersBySubject(this.subjectId,this.moduleId,this.semesterId).subscribe((data)=>{
      this.lecturers = data});
    this.weekdayService.getWeekdays().subscribe((data)=>{
      this.weekdays = data});
    this.classroomService.getClassrooms().subscribe((data)=>{
      this.classrooms = data});
  }

}
