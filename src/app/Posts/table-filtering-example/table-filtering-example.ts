import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export interface PeriodicElement {
  help: string;
  foll: string;
  Company: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {help: 'Payments', foll: 'Facebook', Company: 'About Us'},
  {help: 'Computers', foll: 'Instagram', Company: 'Community'},
  {help: 'Laptops', foll: 'Twiter', Company: 'Blog'},
];

@Component({
  selector: 'table-filtering-example',
  styleUrls: ['table-filtering-example.css'],
  templateUrl: 'table-filtering-example.html',
  standalone: true,
  imports: [MatTableModule],
})
export class TableFilteringExample {
  displayedColumns: string[] = ['help', 'foll', 'Company'];
  dataSource = ELEMENT_DATA;
}