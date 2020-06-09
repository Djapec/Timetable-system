import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TermService} from "../../services/term.service";
import {SnackbarService} from "../../services/snackbar.service";
import {TranslateLoader, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-delete-term-dialog',
  templateUrl: './delete-term-dialog.component.html',
  styleUrls: ['./delete-term-dialog.component.css']
})
export class DeleteTermDialogComponent implements OnInit {

  snackMessage: string;

  constructor(public dialogRef: MatDialogRef<DeleteTermDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private termService: TermService,
              private snackbarService: SnackbarService,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.get('DELETED').subscribe((res) => this.snackMessage = res);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.termService.deleteTerm(this.data.termId).subscribe(() => {
      this.snackbarService.openSnackBar(this.snackMessage);
    },
      (error) => {
        this.snackbarService.openSnackBar(`${error.error}`);
      });
    this.dialogRef.close();
  }

}
