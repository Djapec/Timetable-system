import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from "@angular/cdk/layout";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { HttpClientModule } from "@angular/common/http";
import {TimetableModule} from './components/timetable.module';
import {StyleManagerService} from "./services/style-manager.service";
import {ThemeService} from "./services/theme.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgxMaterialTimepickerModule.setLocale("en-US"),
    HttpClientModule,
    TimetableModule
  ],
  providers: [StyleManagerService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
