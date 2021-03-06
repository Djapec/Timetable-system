import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  firstNameFormControl = new FormControl('', Validators.required);
  lastNameFormControl = new FormControl('', Validators.required);

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private snackbarService: SnackbarService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.setTheme("indigo-pink");
  }

  changeBackground()
  {
    var currentTime = new Date().getHours();
    var login = document.getElementById("register-bg");
    if (7 <= currentTime && currentTime < 19) {
      document.getElementById("login-bg").style.backgroundImage = "url('../../assets/bg.jpg')";
    }
    else {
      document.getElementById("login-bg").style.backgroundImage = "url('../../assets/bg.jpg')";
    }
  }

  onSubmit() {
    let randomString = Math.random().toString(36).slice(-8);

    this.submitted = true;

    // stop here if form is invalid
    if (!this.usernameFormControl.valid || !this.firstNameFormControl.valid || !this.lastNameFormControl.valid) {
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.usernameFormControl.value, randomString, this.firstNameFormControl.value, this.lastNameFormControl.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.snackbarService.openSnackBar(`${error.error}`);
          this.loading = false;
        });
  }

}
