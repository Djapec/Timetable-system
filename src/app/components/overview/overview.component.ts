import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {MatDialog} from "@angular/material/dialog";
import {ScheduleDialogComponent} from "../schedule-dialog/schedule-dialog.component";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule";
import {SnackbarService} from "../../services/snackbar.service";
import {EditTermDialogComponent} from "../edit-term-dialog/edit-term-dialog.component";
import {EditScheduleDialogComponent} from "../edit-schedule-dialog/edit-schedule-dialog.component";
import {DeleteScheduleDialogComponent} from "../delete-schedule-dialog/delete-schedule-dialog.component";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../models/department";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  state: boolean;
  isLoading = true;
  constructor(private sidenavToggleService: SidenavToggleService,
              public dialog: MatDialog,
              public dialogEdit: MatDialog,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService,
              private router: Router,
              private title: Title,
              private departmentService: DepartmentService,
              private translateService: TranslateService) { }
  displayedColumns: string[] = ['id', 'name', 'departmentId', 'semesterId', 'isActive' , 'actions'];
  dataSource = new MatTableDataSource();

  department: Department;
  perPage: string;
  statusChange: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }

  ngOnInit(): void {
    this.translateService.get('PER PAGE').subscribe((res) =>
    {
      this.perPage = res;
      this.paginator._intl.itemsPerPageLabel = this.perPage;
    });

    this.title.setTitle("Overview - Admin - Timetable App");
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;

    this.getData();
    this.dialog.afterAllClosed.subscribe(() => {
      this.getData();
    });
    this.dialogEdit.afterAllClosed.subscribe(() => {
      this.getData();
    });
    this.changeState();
  }

  getData()
  {
    this.scheduleService.getSchedules().subscribe(data => {
      this.isLoading = false;
      this.dataSource.data = data;
    });
  }

  openCreateDialog() {
    this.dialog.open(ScheduleDialogComponent);
  }

  changeScheduleStatus(schedule: Schedule)
  {
    this.translateService.get('STATUS CHANGE').subscribe((res) =>
    {
      this.statusChange = res;
    });
    this.scheduleService.putSchedule(schedule.id, schedule.name, !schedule.isActive).subscribe((data) =>
    {
      this.snackbarService.openSnackBar(`${this.statusChange} ${data.isActive}`);
      this.getData();
    },
      (error) =>
      {
        this.snackbarService.openSnackBar(`${error.error} `);
      });
  }

  openEditScheduleDialog(schedule: Schedule)
  {
    const dialogRef = this.dialog.open(EditScheduleDialogComponent, {
      data: schedule
    });
  }

  openDeleteScheduleDialog(schedule: Schedule)
  {
    const dialogEditRef = this.dialogEdit.open(DeleteScheduleDialogComponent, {
      data: schedule
    });
  }

  viewTimetableEdit(schedule: Schedule) {
    this.router.navigate(['admin/timetable/', schedule.id]);
  }

  getDepartment(departmentId){
    this.departmentService.getDepartmentById(departmentId).subscribe(data => this.department = data);
  }
}
