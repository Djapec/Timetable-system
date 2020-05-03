import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Classroom} from "../../models/classroom";
import {FormControl, Validators} from "@angular/forms";
import {Lecturer} from "../../models/lecturer";
import {Weekday} from "../../models/weekday";
import { LecturerService } from "../../services/lecturer.service";
import {WeekdayService} from "../../services/weekday.service";
import {ClassroomService} from "../../services/classroom.service";

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

  numbers: number[] = [1, 2, 3, 4, 5];

  constructor(public dialogRef: MatDialogRef<TermDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public subjectId: number,
              private lecturerService: LecturerService,
              private weekdayService: WeekdayService,
              private classroomService: ClassroomService) { }

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
    this.lecturerService.getLecturersBySubject(1,1,1).subscribe((data)=>{
      this.lecturers = data});
    this.weekdayService.getWeekdays().subscribe((data)=>{
      this.weekdays = data});
    this.classroomService.getClassrooms().subscribe((data)=>{
      this.classrooms = data});
  }

}
