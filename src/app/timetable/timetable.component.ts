import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table'

export interface PeriodicElement {
  name: string;
  position: number;
  semesterII: string;
  semesterIV: string;
  semesterVI: string;
  semesterVIII: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Informacione tehnologije', semesterII: 'preuzmi', semesterIV: 'preuzmi',semesterVI: 'preuzmi',semesterVIII: 'preuzmi'},
  {position: 2, name: 'Inzenjerski menadzment', semesterII: 'preuzmi',semesterIV: 'preuzmi',semesterVI: 'preuzmi',semesterVIII: 'preuzmi' },
  {position: 3, name: 'Preduzetnicki menadzment', semesterII: 'preuzmi',semesterIV: 'preuzmi',semesterVI: 'preuzmi',semesterVIII: 'preuzmi'},
  {position: 4, name: 'Tehnika i informatika', semesterII: 'preuzmi',semesterIV: 'preuzmi',semesterVI: 'preuzmi',semesterVIII: 'preuzmi'},
  {position: 5, name: 'Mehatronika', semesterII: 'preuzmi',semesterIV: 'preuzmi',semesterVI: 'preuzmi',semesterVIII: 'preuzmi'},
  {position: 6, name: 'Elektrotehnicko i racunarsko inzenjerstvo', semesterII: 'preuzmi',semesterIV: 'preuzmi',semesterVI: 'preuzmi',semesterVIII: 'preuzmi'}
];

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})

export class TimetableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'semesterII', 'semesterIV', 'semesterVI', 'semesterVIII'];
  dataSource = ELEMENT_DATA;
  
  constructor() { }

  ngOnInit(): void {
  }

}
