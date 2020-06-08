import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {ActivatedRoute} from "@angular/router";
import {ScheduleService} from "../../services/schedule.service";
import {Schedule} from "../../models/schedule";
import {SnackbarService} from "../../services/snackbar.service";
import {TermService} from "../../services/term.service";
import {Term} from "../../models/term";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ExportFileComponent} from "../export-file/export-file.component";
import {Title} from "@angular/platform-browser";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-shedule-view',
  templateUrl: './shedule-view.component.html',
  styleUrls: ['./shedule-view.component.css']
})
export class SheduleViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private snackbarService: SnackbarService,
              private sidenavToggleService: SidenavToggleService,
              private termService: TermService,
              private bottomSheet: MatBottomSheet,
              private title: Title,
              private themeService: ThemeService) { }

  state: boolean;
  scheduleId: number;
  schedule: Schedule;
  terms: Term[];
  isLoading = true;

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }
  ngOnInit(): void {
    this.changeState();
    this.route.paramMap.subscribe(params => {
      this.scheduleId = Number(params.get('scheduleId'));
    });
    this.changeState();
    this.scheduleId = +this.route.snapshot.params.scheduleId;
    this.scheduleService.getScheduleById(this.scheduleId).subscribe((data) =>{
      this.schedule = data;
      this.title.setTitle(`Schedule ${this.schedule.id} - Timetable App`);
    });
    this.termService.getTermsByScheduleId(this.scheduleId).subscribe((data) =>
    {
      this.isLoading = false;
      this.terms = data.sort(x => x.weekdayId);
      console.log(this.terms);
    })
  }

  openBottomSheet() {
    this.bottomSheet.open(ExportFileComponent, {data: this.scheduleId});
  }

  getTermClassName(term: Term): string
  {
    if(term.numberOfLectures > 0)
    {
      return "term-card-lecture";
    }
    else if(term.numberOfExercises > 0)
    {
      return "term-card-exercises";
    }
    else {
      return "term-card-lab-exercises";
    }
  }
}

