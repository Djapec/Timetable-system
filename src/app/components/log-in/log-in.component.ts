import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { first } from 'rxjs/operators';

import {AuthenticationService} from "../../services/authentication.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  usernameFormControl = new FormControl('', Validators.required);
  passwordFormControl = new FormControl('', Validators.required);

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackbarService: SnackbarService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (!this.usernameFormControl.valid || !this.passwordFormControl.valid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.usernameFormControl.value, this.passwordFormControl.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.snackbarService.openSnackBar(`${error.error}`);
          this.loading = false;
        });
  }

}
