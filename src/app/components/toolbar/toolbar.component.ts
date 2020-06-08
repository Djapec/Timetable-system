import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd, NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import {ThemeService} from "../../services/theme.service";
import {Observable} from "rxjs";
import {Option} from "../../models/option";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";
import {Role} from "../../models/role";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: User;
  loading = false;
  constructor(public router: Router, private themeService: ThemeService, private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  get isLoggedIn()
  {
    return this.user != null;
  }

  logout() {
    this.authenticationService.logout();
  }

  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  @Output() toggleSidenav = new EventEmitter<void>();


  ngOnInit(): void {
    this.themeService.setTheme("deeppurple-amber");
  }
  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }
}
