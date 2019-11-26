import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './../_models';

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
export class CategoryService {

  private url = 'http://localhost:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** GET users from the server */
  getCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/Categorys');
  }
  
  /** GET category by id. Will 404 if id not found */
  getCategory(id: number): Observable<any> {
    const url = `${this.url}/category/${id}`;
    return this.http.get<Category>(url);
  }
  
  /** POST: add a new category to the server */
  addCategory(category: Category) {
	//console.log(category);
    return this.http.post(this.url + '/category/add', category, httpOptions);
  }
  
  /** PUT: update the category on the server */
  updateCategory(category: Category): Observable<any> {
    return this.http.put(this.url + '/category/update', category, httpOptions);
  }
  
  /** DELETE: delete the category from the server */
  deleteCategory(category: Category | number) {
	  if (confirm("Are you sure to delete?")) {
		const id = typeof category === 'number' ? category : category.id;
		const url = `${this.url}/category/delete/${id}`;
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