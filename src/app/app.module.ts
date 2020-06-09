import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from "@angular/cdk/layout";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TimetableModule} from './components/timetable.module';
import { StyleManagerService } from "./services/style-manager.service";
import { ThemeService } from "./services/theme.service";
import { MaterialModule } from "./shared/material/material.module";

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
    TimetableModule,
    MaterialModule,
  ],
  providers: [StyleManagerService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
