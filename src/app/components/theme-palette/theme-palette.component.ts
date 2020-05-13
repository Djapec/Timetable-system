import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Option} from "../../models/option";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-theme-palette',
  templateUrl: './theme-palette.component.html',
  styleUrls: ['./theme-palette.component.css']
})
export class ThemePaletteComponent {

  @Input() options: Array<Option>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  changeTheme(themeToSet) {
    this.themeChange.emit(themeToSet);
  }

}
