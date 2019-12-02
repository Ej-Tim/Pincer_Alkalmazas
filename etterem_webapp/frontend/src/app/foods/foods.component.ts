import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Food, Category } from '../_models'
import { FoodService, CategoryService } from '../_services';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  categories: Category[] = [];
  foods: Food[] = [];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private foodService: FoodService, private location: Location ) { }

  ngOnInit() {
    this.get_Categories();
    this.get_Foods();
  }
  get_Foods(): void{
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
  }

  get_Categories(): void{
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  goBack(): void {
		this.location.back();
	}
}
