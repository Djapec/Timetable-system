import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material/material.module';
import { NgPipesModule } from "ngx-pipes";

import { MainContentComponent } from './main-content/main-content.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TimetableAppComponent } from './timetable-app.component';
import { TreeComponent } from './tree/tree.component';
import { TimetableComponent } from './timetable/timetable.component';
import {RouterModule, Routes} from '@angular/router';
import { TermDialogComponent } from './term-dialog/term-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { OverviewComponent } from './overview/overview.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TimetableNavTabComponent} from './timetable-nav-tab/timetable-nav-tab.component';
import {SemesterTableComponent} from './semester-table/semester-table.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SheduleViewComponent } from './shedule-view/shedule-view.component';
import {SnackbarService} from "../services/snackbar.service";
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { DeleteTermDialogComponent } from './delete-term-dialog/delete-term-dialog.component';
import { EditTermDialogComponent } from './edit-term-dialog/edit-term-dialog.component';

const routes: Routes = [
  { path: '', component: TimetableAppComponent,
    children: [
      { path: 'admin', children:
        [
          { path: '', component: OverviewComponent },
          { path: 'timetable/:scheduleId', component: ScheduleTableComponent},
        ]},
      { path: '', component: TimetableNavTabComponent },
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
    TimetableComponent,
    TermDialogComponent,
    TimetableNavTabComponent,
    ScheduleTableComponent,
    SemesterTableComponent,
    OverviewComponent,
    SheduleViewComponent,
    ScheduleDialogComponent,
    DeleteTermDialogComponent,
    EditTermDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule.setLocale('en-US'),
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    NgPipesModule
  ],
  providers: [SnackbarService]
})
export class TimetableModule { }
