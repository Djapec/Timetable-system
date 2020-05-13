import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = "Okay", duration: number = 6000) {
    this._snackBar.open(message, action, {
      duration: duration
    });
  }
}
