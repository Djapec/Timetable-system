import { Component, OnInit } from '@angular/core';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';

@Component({
  selector: 'app-shedule-view',
  templateUrl: './shedule-view.component.html',
  styleUrls: ['./shedule-view.component.css']
})
export class SheduleViewComponent implements OnInit {
  state: boolean;

  constructor( private sidenavToggleService: SidenavToggleService ) { }

  changeState() {
    this.sidenavToggleService.changeState(this.state = false);
  }
  ngOnInit(): void {
    this.changeState();
  }

}
