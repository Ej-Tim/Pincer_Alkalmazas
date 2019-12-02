import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Food } from '../_models'
import { FoodService } from '../_services';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-appetizers',
  templateUrl: './appetizers.component.html',
  styleUrls: ['./appetizers.component.css']
})
export class AppetizersComponent implements OnInit {

  foods: Food[] = [];
  foodok: SelectItem[] = [];
  cat_id: Number;

  constructor(private route: ActivatedRoute, private foodService: FoodService) { }

  ngOnInit() {
    this.cat_id = + this.route.snapshot.paramMap.get('cat_id');
    this.get_Foods();
  }

  get_Foods(): void{
    this.foodService.getFoods().subscribe(foods => this.foods = foods);
  }

  get_Foodok(): void{
    this.foodService.getFoods().subscribe(foodok =>{
      var n = Object.keys(this.foods).length;
      for(let i = 0; i < n; i++) {
        this.foodok.push({label: this.foods[i].name, value: this.foods[i].name});
    }
    });
  }
}
