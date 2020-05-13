import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ThemeService} from "../../services/theme.service";
import {Observable} from "rxjs";
import {Option} from "../../models/option";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public router: Router, private themeService: ThemeService) { }

  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  @Output() toggleSidenav = new EventEmitter<void>();

  ngOnInit(): void {
    this.themeService.setTheme("deeppurple-amber");
  }
  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }
}
