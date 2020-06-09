import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {ScheduleService} from "../../services/schedule.service";
import {SnackbarService} from "../../services/snackbar.service";
import {Schedule} from "../../models/schedule";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-edit-schedule-dialog',
  templateUrl: './edit-schedule-dialog.component.html',
  styleUrls: ['./edit-schedule-dialog.component.css']
})
export class EditScheduleDialogComponent implements OnInit {
  nameFormControl = new FormControl('', Validators.required);
  isActiveFormControl = new FormControl('', Validators.required);
  snackMessage: string;

  constructor(public dialogRef: MatDialogRef<EditScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public schedule: Schedule,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    console.log(this.schedule);
    this.nameFormControl.setValue(this.schedule.name);
    this.isActiveFormControl.setValue(this.schedule.isActive);
    this.translateService.get('CHANGED').subscribe((res) => this.snackMessage = res);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFormValid(): boolean{
    return this.nameFormControl.valid && this.isActiveFormControl.valid;
  }

  onYesClick() {
    this.scheduleService.putSchedule(this.schedule.id, this.nameFormControl.value, this.isActiveFormControl.value).subscribe((data) =>
      {
        this.snackbarService.openSnackBar(this.snackMessage);
      },
      (error) =>
      {
        this.snackbarService.openSnackBar(`${error.error}`);
      });
    this.dialogRef.close();
  }
}
