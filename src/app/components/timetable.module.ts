import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { MaterialModule } from "../shared/material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MainContentComponent } from "./main-content/main-content.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { TimetableAppComponent } from './timetable-app.component';
import {TimetableService} from "../services/timetable.service";
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  { path: '', component: TimetableAppComponent,
  children: [
    { path: '', component: MainContentComponent }
  ]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [TimetableAppComponent, MainContentComponent, SidenavComponent, ToolbarComponent, TreeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    TimetableService
  ]
})
export class TimetableModule { }
