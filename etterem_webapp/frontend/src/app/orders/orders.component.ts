import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Table_order } from '../_models';
import { Table_orderService } from '../_services';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  tables: Table_order[] = [];
  tableok: MenuItem[] = [];
  activeFood: MenuItem;

  constructor(private route: ActivatedRoute, private table_orderService: Table_orderService) { }

  ngOnInit() {
    this.get_Tableok();
  }

  get_Tableok(): void{
    this.table_orderService.getTable_orders().subscribe(tableok =>{
      this.tables = tableok;
      var n = Object.keys(this.tables).length;
      for(let i = 0; i < n; i++) {
        this.tableok.push({label: this.tables[i].id.toString(), routerLink: ['/orders/'+ this.tables[i].id]});
      }
    });
  }

}
