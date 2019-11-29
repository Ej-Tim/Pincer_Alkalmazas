import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Table_order } from '../_models';
import { Table_orderService } from '../_services';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  tables: Table_order[] = [];

  constructor(private route: ActivatedRoute, private table_orderService: Table_orderService) { }

  ngOnInit() {
    this.get_Table_Orders()
  }

  get_Table_Orders(): void{
    this.table_orderService.getTable_orders().subscribe(tables => this.tables = tables);
  }

  handleClick(pageName:string): void {
    //execute action
    //this.route.navigate([`${pageName}`]);
  }
}
