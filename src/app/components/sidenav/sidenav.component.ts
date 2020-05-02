import { Component, OnInit , NgZone} from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BreakpointObserver } from "@angular/cdk/layout";

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit {
  title = "Menu";
  isScreenSmall: Observable<boolean>;

  constructor(breakpoints: BreakpointObserver) {
    this.isScreenSmall =
      breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
        .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit() {
  }
}
