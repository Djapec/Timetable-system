import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainContentComponent } from './main-content/main-content.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TimetableAppComponent } from './timetable-app.component';
import {TimetableService} from '../services/timetable.service';
import { TreeComponent } from './tree/tree.component';
import { SemesterTableComponent } from './semester-table/semester-table.component';
import {TimetableNavTabComponent} from './timetable-nav-tab/timetable-nav-tab.component';
import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [
  { path: '', component: TimetableAppComponent,
  children: [
    {path: '', component: TimetableNavTabComponent},
  ]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    TimetableAppComponent,
    MainContentComponent,
    SidenavComponent, ToolbarComponent,
    TreeComponent,
    SemesterTableComponent,
    TimetableNavTabComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    MatTabsModule
  ],
  exports: [
    TimetableNavTabComponent
  ],
  providers: [
    TimetableService
  ]
})
export class TimetableModule { }
