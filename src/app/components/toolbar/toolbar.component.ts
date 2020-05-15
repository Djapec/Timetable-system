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

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  loading = false;
  constructor(public router: Router, private themeService: ThemeService) {
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

  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  @Output() toggleSidenav = new EventEmitter<void>();

  ngOnInit(): void {
    this.themeService.setTheme("deeppurple-amber");
  }
  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }
}
