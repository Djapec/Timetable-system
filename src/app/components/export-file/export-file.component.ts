import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ExportAsConfig, ExportAsService} from "ngx-export-as";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Schedule} from "../../models/schedule";
import {SnackbarService} from "../../services/snackbar.service";
import {ScheduleService} from "../../services/schedule.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.css']
})
export class ExportFileComponent implements OnInit {

  schedule: Schedule;
  snackMessage: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<ExportFileComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public scheduleId: number,
              private exportAsService: ExportAsService,
              private snackbarService: SnackbarService,
              private scheduleService: ScheduleService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.scheduleService.getScheduleById(this.scheduleId).subscribe((data) => this.schedule = data);
    this.translateService.get('DOWNLOADED').subscribe((res) => this.snackMessage = res);
  }

  exportAsPDFConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'schedule-content'
  }

  exportAsPNGConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'schedule-content'
  }

  exportAs(format: string): void {
    switch (format) {
      case "pdf":
        this.exportAsService.save(this.exportAsPDFConfig, this.schedule.name).subscribe(() => {
          this.snackbarService.openSnackBar(this.snackMessage);
        });
        this.bottomSheetRef.dismiss();
        break;
      case "png":
        this.exportAsService.save(this.exportAsPNGConfig, this.schedule.name).subscribe(() => {
          this.snackbarService.openSnackBar(this.snackMessage);
        });
        this.bottomSheetRef.dismiss();
        break;
    }
  }


}
