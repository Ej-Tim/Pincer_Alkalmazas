import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FoodService, Food_orderService } from '../_services';
import { Food_order, OrderedFood } from '../_models';

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

  constructor(private route: ActivatedRoute, private foodService: FoodService, private food_orderService: Food_orderService) { }

  ngOnInit() {
    this.table_id = + this.route.snapshot.paramMap.get('table_id');
    this.get_FoodsByTable();
    this.get_Food_Orders();
  }

  get_FoodsByTable(): void{
    this.foodService.getFoodsbyTable(this.table_id).subscribe(foodsByTable => this.foodsByTable = foodsByTable);
  }
  
  get_Food_Orders(): void{
    this.food_orderService.getFood_orders().subscribe(food_Orders => this.food_Orders = food_Orders);
  }

  get_Foods(): void{
    this.get_Food_Orders();
  }
}
