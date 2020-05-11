import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';

@Component({
  selector: 'app-timetable-nav-tab',
  templateUrl: './timetable-nav-tab.component.html',
  styleUrls: ['./timetable-nav-tab.component.css']
})
export class TimetableNavTabComponent implements OnInit {
  state: boolean;
  constructor(private root: ActivatedRoute, private sidenavToggleService: SidenavToggleService) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }
  ngOnInit(): void {
    this.changeState();
  }

}
