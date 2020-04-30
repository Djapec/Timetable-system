import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private root: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
