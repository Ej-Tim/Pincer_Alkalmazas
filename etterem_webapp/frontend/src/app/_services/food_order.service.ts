import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Food_order } from './../_models';

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
export class Food_orderService {

  private url = 'http://localhost:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** GET users from the server */
  getFood_orders(): Observable<Food_order[]> {
    return this.http.get<Food_order[]>(this.url + '/food_orders');
  }
  
  /** GET food_order by id. Will 404 if id not found */
  getFood_order(id: number): Observable<any> {
    const url = `${this.url}/food_order/${id}`;
    return this.http.get<Food_order>(url);
  }
  
  /** POST: add a new food_order to the server */
  addFood_order(food_order: Food_order) {
	//console.log(food_order);
    return this.http.post(this.url + '/food_order/add', food_order, httpOptions);
  }
  
  /** PUT: update the food_order on the server */
  updateFood_order(food_order: Food_order): Observable<any> {
    return this.http.put(this.url + '/food_order/update', food_order, httpOptions);
  }
  
  /** DELETE: delete the food_order from the server */
  deleteFood_order(food_order: Food_order | number) {
	  if (confirm("Are you sure to delete?")) {
		const id = typeof food_order === 'number' ? food_order : food_order.id;
		const url = `${this.url}/food_order/delete/${id}`;
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