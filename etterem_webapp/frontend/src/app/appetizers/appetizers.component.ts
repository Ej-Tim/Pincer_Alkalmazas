import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Food, Food_order } from '../_models'
import { FoodService, Food_orderService } from '../_services';
import { escapeIdentifier } from '@angular/compiler/src/output/abstract_emitter';

@Component({
  selector: 'app-appetizers',
  templateUrl: './appetizers.component.html',
  styleUrls: ['./appetizers.component.css']
})
export class AppetizersComponent implements OnInit {

  foodbyCategory: Food[] = [];
  toBeOrdered: Food[];
  cat_id: number;
  id: number;
  val: number[] = [];
  food_order: Food_order;

  constructor(private route: ActivatedRoute, private foodService: FoodService, private food_orderService: Food_orderService, private location: Location) { }

  ngOnInit() {
    this.cat_id = + this.route.snapshot.paramMap.get('cat_id');
    this.id = + this.route.parent.snapshot.paramMap.get('id');
    this.get_FoodbyCategory();
  }


  get_FoodbyCategory(): void{
    this.foodService.getFoodbyCategory(this.cat_id).subscribe(foodbyCategory => this.foodbyCategory = foodbyCategory);
  }

  rendeles(): void{
    this.toBeOrdered = [];
    for (let i = 0; i < this.foodbyCategory.length; i++){
      if ( this.val[i] > 0) {
        this.toBeOrdered.push(
          {
            name: this.foodbyCategory[i].name,
            price: this.foodbyCategory[i].price,
            category_id: this.foodbyCategory[i].category_id
          });
      }
    }
  }

  init_Food_Order(): void{
    this.food_order = { table_order_id: this.id, food_id: 3, quantity: 1};
  }

  megrendel(): void {
    this.id = + this.route.parent.snapshot.paramMap.get('id');
    for (let i = 0; i < this.foodbyCategory.length; i++){
      if ( this.val[i] > 0){  
        this.food_order = { table_order_id: this.id, food_id: this.foodbyCategory[i].id, quantity: this.val[i]};
        this.food_orderService.addFood_order(this.food_order).subscribe(() => this.goBack());
      }
    }
  }
  
  goBack(): void {
		this.location.back();
	}
}
