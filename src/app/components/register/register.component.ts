import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../services/snackbar.service";

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
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
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
