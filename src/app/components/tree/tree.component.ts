import {Component, Input, OnInit} from '@angular/core';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  panelOpenState = false;
  constructor() {
  }
}
