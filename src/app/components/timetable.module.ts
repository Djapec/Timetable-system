import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material/material.module';
import { NgPipesModule } from "ngx-pipes";
import { ExportAsModule } from "ngx-export-as";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MainContentComponent } from './main-content/main-content.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TimetableAppComponent } from './timetable-app.component';
import { TreeComponent } from './tree/tree.component';
import { TimetableComponent } from './timetable/timetable.component';
import { RouterModule, Routes } from '@angular/router';
import { TermDialogComponent } from './term-dialog/term-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';
import { OverviewComponent } from './overview/overview.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TimetableNavTabComponent } from './timetable-nav-tab/timetable-nav-tab.component';
import { SemesterTableComponent } from './semester-table/semester-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SheduleViewComponent } from './shedule-view/shedule-view.component';
import { SnackbarService } from "../services/snackbar.service";
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import { DeleteTermDialogComponent } from './delete-term-dialog/delete-term-dialog.component';
import { EditTermDialogComponent } from './edit-term-dialog/edit-term-dialog.component';
import { EditScheduleDialogComponent } from './edit-schedule-dialog/edit-schedule-dialog.component';
import { DeleteScheduleDialogComponent } from './delete-schedule-dialog/delete-schedule-dialog.component';
import { ExportFileComponent } from './export-file/export-file.component';
import { ThemePaletteComponent } from './theme-palette/theme-palette.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from "../helpers/auth.guard";
import {Role} from "../models/role";

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'register',
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    component: RegisterComponent },
  { path: '', component: TimetableAppComponent,
    children: [
      { path: 'timetable/:scheduleId', component: SheduleViewComponent },
      { path: 'admin',
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] },
        children:
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
    EditTermDialogComponent,
    EditScheduleDialogComponent,
    DeleteScheduleDialogComponent,
    ExportFileComponent,
    ThemePaletteComponent,
    LogInComponent,
    RegisterComponent
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
    NgPipesModule,
    ExportAsModule,
    FlexLayoutModule
  ],
  providers: [SnackbarService]
})
export class TimetableModule { }
