import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Schedule} from "../../models/schedule";
import {ScheduleService} from "../../services/schedule.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-delete-schedule-dialog',
  templateUrl: './delete-schedule-dialog.component.html',
  styleUrls: ['./delete-schedule-dialog.component.css']
})
export class DeleteScheduleDialogComponent implements OnInit {

  constructor(public dialogEditRef: MatDialogRef<DeleteScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public schedule: Schedule,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogEditRef.close();
  }

  onYesClick(): void {
    this.scheduleService.deleteSchedule(this.schedule.id).subscribe((data) => {
        this.snackbarService.openSnackBar("Successfully deleted!");
        location.reload();
      },
      (error) => {
        this.snackbarService.openSnackBar(`${error} + - ${error.statusText}`);
      });
    this.dialogEditRef.close();
  }
}
