import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from "../shared/material/material.module";

import { MainContentComponent } from "./main-content/main-content.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { TimetableAppComponent } from './timetable-app.component';
import { TimetableService } from "../services/timetable.service";
import { TreeComponent } from './tree/tree.component';
import { TimetableComponent } from './timetable/timetable.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: TimetableAppComponent,
    children: [
      { path: 'timetable', component: TimetableComponent },
      { path: '', component: MainContentComponent },
    ]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    TimetableAppComponent,
    MainContentComponent,
    SidenavComponent,
    ToolbarComponent,
    TreeComponent,
    TimetableComponent
  ],
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
