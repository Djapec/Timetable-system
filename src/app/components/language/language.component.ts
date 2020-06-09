import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Option} from "../../models/option";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  @Input() options: Array<string>;
  @Output() langChange: EventEmitter<string> = new EventEmitter<string>();

  snackMessage: string;
  lang: string;

  constructor(public translateService: TranslateService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.translateService.get('LANG OKAY').subscribe((res) => this.snackMessage = res);
  }

  changeLang(language: string)
  {
    localStorage.setItem('LANG', language);
    this.translateService.use(language);
    this.lang = language;
    this.snackbarService.openSnackBar(this.snackMessage);
  }

}
