import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  semester: string;
  name: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Informacione tehnologije', semester: 'I', createdAt: '2/2/2020', updatedAt: '3/3/2000'},
  {position: 2, name: 'Informacione tehnologije', semester: 'II', createdAt: '2/2/2020', updatedAt: '3/3/2000'},
  {position: 3, name: 'Informacione tehnologije', semester: 'III', createdAt: '2/2/2020', updatedAt: '3/3/2000'},
  {position: 4, name: 'Informacione tehnologije', semester: 'IV', createdAt: '2/2/2020', updatedAt: '3/3/2000'},
  {position: 5, name: 'Informacione tehnologije', semester: 'V', createdAt: '2/2/2020', updatedAt: '3/3/2000'},
  {position: 6, name: 'Informacione tehnologije', semester: 'VI', createdAt: '2/2/2020', updatedAt: '3/3/2000'},
  {position: 7, name: 'Informacione tehnologije', semester: 'VII', createdAt: '2/2/2020', updatedAt: '3/3/2000'},
  {position: 8, name: 'Informacione tehnologije', semester: 'VIII', createdAt: '2/2/2020', updatedAt: '3/3/2000'}
];

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['name', 'semester', 'createdAt', 'updatedAt' , 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
