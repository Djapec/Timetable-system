import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-timetable-nav-tab',
  templateUrl: './timetable-nav-tab.component.html',
  styleUrls: ['./timetable-nav-tab.component.css']
})
export class TimetableNavTabComponent implements OnInit {

  constructor(private root: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
