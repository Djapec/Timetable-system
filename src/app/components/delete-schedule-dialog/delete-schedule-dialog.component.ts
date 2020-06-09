import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Schedule} from "../../models/schedule";
import {ScheduleService} from "../../services/schedule.service";
import {SnackbarService} from "../../services/snackbar.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-delete-schedule-dialog',
  templateUrl: './delete-schedule-dialog.component.html',
  styleUrls: ['./delete-schedule-dialog.component.css']
})
export class DeleteScheduleDialogComponent implements OnInit {

  snackMessage: string;

  constructor(public dialogEditRef: MatDialogRef<DeleteScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public schedule: Schedule,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.get('DELETED').subscribe((res) => this.snackMessage = res);
  }

  onNoClick(): void {
    this.dialogEditRef.close();
  }

  onYesClick(): void {
    this.scheduleService.deleteSchedule(this.schedule.id).subscribe((data) => {
        this.snackbarService.openSnackBar(this.snackMessage);
      },
      (error) => {
        this.snackbarService.openSnackBar(`${error.error}`);
      });
    this.dialogEditRef.close();
  }
}
