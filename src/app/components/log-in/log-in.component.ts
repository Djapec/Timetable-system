import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { first } from 'rxjs/operators';

import {AuthenticationService} from "../../services/authentication.service";
import {SnackbarService} from "../../services/snackbar.service";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}|admin$")]);
  passwordFormControl = new FormControl('', Validators.required);

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackbarService: SnackbarService,
    private themeService: ThemeService) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.themeService.setTheme("indigo-pink");
  }

  changeBackground()
  {
    var currentTime = new Date().getHours();
    if (7 <= currentTime && currentTime < 19) {
      document.getElementById("login-bg").style.backgroundImage = "url('/assets/bg.jpg')";
    }
    else {
      document.getElementById("login-bg").style.backgroundImage = "url('/assets/bg.jpg')";
    }
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
