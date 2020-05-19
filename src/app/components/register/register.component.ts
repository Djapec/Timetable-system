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
  usernameFormControl = new FormControl('', Validators.required);
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
    this.changeBackground();
    this.themeService.setTheme("indigo-pink");
  }

  changeBackground()
  {
    var currentTime = new Date().getHours();
    var login = document.getElementById("register-bg");
    if (7 <= currentTime && currentTime < 19) {
      login.style.backgroundImage = "url(https://lh4.googleusercontent.com/-XplyTa1Za-I/VMSgIyAYkHI/AAAAAAAADxM/oL-rD6VP4ts/w1184-h666/Android-Lollipop-wallpapers-Google-Now-Wallpaper-2.png)";
    }
    else {
      login.style.backgroundImage = "url(https://cdn.techjuice.pk/wp-content/uploads/2016/07/12.png)";
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
