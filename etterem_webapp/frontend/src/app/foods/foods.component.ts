import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Food, Category } from '../_models'
import { FoodService, CategoryService } from '../_services';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  categories: Category[] = [];
  foods: Food[] = [];
  catok: MenuItem[] = [];
  activeFood: MenuItem;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private foodService: FoodService) {}

  ngOnInit() {
    this.get_Categories();
    this.get_Foods();
    this.get_Categorik();
  }

  get_Categories(): void{
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  get_Foods(): void{
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
  }

  get_Categorik(): void{
    const id = + this.route.snapshot.paramMap.get('id');
    const cat_id = + this.route.snapshot.paramMap.get('cat_id');
    this.categoryService.getCategories().subscribe(catok =>{
      var n = Object.keys(this.categories).length;
      for(let i = 0; i < n; i++) {
        this.catok.push({label: this.categories[i].name, url: '/'+ id +'/foods/'+ this.categories[i].id});
      }
    });
  }
}
