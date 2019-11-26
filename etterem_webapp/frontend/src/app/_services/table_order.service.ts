import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Table_order } from './../_models';

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
export class Table_orderService {

  private url = 'http://localhost:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** GET users from the server */
  getTable_orders(): Observable<Table_order[]> {
    return this.http.get<Table_order[]>(this.url + '/table_orders');
  }
  
  /** GET table_order by id. Will 404 if id not found */
  getTable_order(id: number): Observable<any> {
    const url = `${this.url}/table_order/${id}`;
    return this.http.get<Table_order>(url);
  }
  
  /** POST: add a new table_order to the server */
  addTable_order(table_order: Table_order) {
	//console.log(table_order);
    return this.http.post(this.url + '/table_order/add', table_order, httpOptions);
  }
  
  /** PUT: update the table_order on the server */
  updateTable_order(table_order: Table_order): Observable<any> {
    return this.http.put(this.url + '/table_order/update', table_order, httpOptions);
  }
  
  /** DELETE: delete the table_order from the server */
  deleteTable_order(table_order: Table_order | number) {
	  if (confirm("Are you sure to delete?")) {
		const id = typeof table_order === 'number' ? table_order : table_order.id;
		const url = `${this.url}/table_order/delete/${id}`;
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