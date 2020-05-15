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

class Color {id: number; color: string}

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

  colors: Color[] = [
    {id: 1, color: "#5c6bc0"},
    {id: 2, color: "#8e99f3"},
    {id: 3, color: "#3f51b5"},
    {id: 4, color: "#7986cb"},
    {id: 5, color: "#aab6fe"},
    {id: 6, color: "#49599a"},
    {id: 7, color: "#9fa8da"},
  ];

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
      this.terms = data;
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

