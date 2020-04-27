import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  semester: string;
  position: number;
  download: string;
  datum: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, semester: 'II', download: 'preuzmi', datum: '18/1/2020'},
  {position: 2, semester: 'IV', download: 'preuzmi', datum: '18/1/2020'},
  {position: 3, semester: 'VI', download: 'preuzmi', datum: '18/1/2020'},
  {position: 4, semester: 'VIII', download: 'preuzmi', datum: '18/1/2020'},
  {position: 5, semester: 'Master', download: 'preuzmi', datum: '18/1/2020'}
];

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable-nav-tab.component.html',
  styleUrls: ['./timetable-nav-tab.component.css']
})
export class TimetableNavTabComponent implements OnInit {
  displayedColumns: string[] = ['position', 'semester', 'download', 'datum'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
