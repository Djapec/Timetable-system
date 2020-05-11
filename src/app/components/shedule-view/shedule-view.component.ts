import { Component, OnInit } from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ActivatedRoute} from "@angular/router";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-shedule-view',
  templateUrl: './shedule-view.component.html',
  styleUrls: ['./shedule-view.component.css']
})
export class SheduleViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService,
              private sidenavToggleService: SidenavToggleService ) { }

  state: boolean;
  scheduleId: number;
  schedule: Schedule;

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }
  ngOnInit(): void {
    this.changeState();
    this.route.paramMap.subscribe(params => {
      this.scheduleId = Number(params.get('scheduleId'));
    });
  }

  LoadSchedule(scheduleId: number)
  {
    this.scheduleService.getScheduleById(scheduleId).subscribe((data)=>{
      this.schedule = data});

    if(this.schedule == null)
    {
      this.snackbarService.openSnackBar("Schedule is not found!");
    }
  }

}
