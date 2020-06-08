import { Component, OnInit , NgZone} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import {SidenavToggleService} from '../../services/sidenav-toggle.service';
import {Router} from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  title = 'Menu';
  isScreenSmall: Observable<boolean>;
  state = true;

  constructor(breakpoints: BreakpointObserver, public router: Router, private sidenavToggleService: SidenavToggleService) {
    this.isScreenSmall =
      breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
        .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit() {
    this.sidenavToggleService.currentState.subscribe(state => this.state = state);
  }
}
