import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FoodService, Food_orderService, Table_orderService } from '../_services';
import { Food_order, OrderedFood, Table_order } from '../_models';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  table_id: number;
  foodsByTable: OrderedFood[] = [];
  tmp: number[];
  foodsByTableDistinct: OrderedFood[] = [];
  food_Orders: Food_order[] = [];
  table: Table_order;

  constructor(private route: ActivatedRoute, private foodService: FoodService, private food_orderService: Food_orderService, private table_orderService: Table_orderService) { }

  ngOnInit() {
    this.table_id = + this.route.snapshot.paramMap.get('table_id');
    this.get_FoodsByTable();
  }

  get_FoodsByTable(): void{
    this.foodService.getFoodsbyTable(this.table_id).subscribe(foodsByTable => this.foodsByTable = foodsByTable);
  }
  
  updateTable(): void {		
		this.table_orderService.updateTable_order(this.table).subscribe(success => this.get_FoodsByTable());
	}
  
  delete_Food_Orders(food_Order: OrderedFood): void{
    this.food_orderService.deleteFood_order(food_Order).subscribe(success => {this.get_FoodsByTable()} );    
  }

  unReserve(): void{
    this.get_FoodsByTable();
    if (this.foodsByTable){
      this.table_id = + this.route.snapshot.paramMap.get('table_id');
      this.table = {id: 14, reserve: 0};
      this.updateTable();
    }
  }
}
