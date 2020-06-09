import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  okay: string;

  constructor(private _snackBar: MatSnackBar, private translateService: TranslateService) {
    this.translateService.get('OKAY').subscribe((res) => this.okay = res);
  }

  openSnackBar(message: string, action: string = this.okay, duration: number = 6000) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }
}
