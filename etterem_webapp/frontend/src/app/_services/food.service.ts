import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Food } from './../_models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}

@Injectable({ providedIn: 'root' })
export class FoodService {

  private url = 'http://localhost:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** GET users from the server */
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.url + '/foods');
  }
  
  /** GET food by id. Will 404 if id not found */
  getFood(id: number): Observable<any> {
    const url = `${this.url}/food/${id}`;
    return this.http.get<Food>(url);
  }
  getFoodbyCategory(category_id: Number): Observable<any> {
    const url = `${this.url}/category/${category_id}/foods`;
    return this.http.get<Food>(url);
  }
  
  /** POST: add a new food to the server */
  addFood(food: Food) {
	//console.log(food);
    return this.http.post(this.url + '/food/add', food, httpOptions);
  }
  
  /** PUT: update the food on the server */
  updateFood(food: Food): Observable<any> {
    return this.http.put(this.url + '/food/update', food, httpOptions);
  }
  
  /** DELETE: delete the food from the server */
  deleteFood(food: Food | number) {
	  if (confirm("Are you sure to delete?")) {
		const id = typeof food === 'number' ? food : food.id;
		const url = `${this.url}/food/delete/${id}`;
		return this.http.delete(url, httpOptions);
	  }
	  return of({});
  }

  isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>(this.url + '/login')
  }

  logout() {
    return this.http.get<logoutStatus>(this.url + '/logout')
  }
  
}