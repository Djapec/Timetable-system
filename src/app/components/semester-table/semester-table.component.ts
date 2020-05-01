import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  semester: string;
  position: number;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, semester: 'I', date: '2/2/2020'},
  {position: 2, semester: 'II', date: '2/2/2020'},
  {position: 3, semester: 'III', date: '2/2/2020'},
  {position: 4, semester: 'IV', date: '2/2/2020'},
  {position: 5, semester: 'V', date: '2/2/2020'},
  {position: 6, semester: 'VI', date: '2/2/2020'},
  {position: 7, semester: 'VII', date: '2/2/2020'},
  {position: 8, semester: 'VIII', date: '2/2/2020'}
];

@Component({
  selector: 'app-semester-table',
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.css']
})
export class SemesterTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'semester', 'data' , 'view'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
