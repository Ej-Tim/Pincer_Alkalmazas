import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Role } from './../_models';

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
export class RoleService {

  private url = 'http://localhost:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** GET roles from the server */
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + '/roles');
  }
  
  /** GET role by id. Will 404 if id not found */
  getRole(id: number): Observable<any> {
    const url = `${this.url}/role/${id}`;
    return this.http.get<Role>(url);
  }
  
  /** POST: add a new role to the server */
  addRole(role: Role) {
	//console.log(role);
    return this.http.post(this.url + '/role/add', role, httpOptions);
  }
  
  /** PUT: update the role on the server */
  updateRole(role: Role): Observable<any> {
    return this.http.put(this.url + '/role/update', role, httpOptions);
  }
  
  /** DELETE: delete the role from the server */
  deleteRole(role: Role | number) {
	  if (confirm("Are you sure to delete?")) {
		const id = typeof role === 'number' ? role : role.id;
		const url = `${this.url}/role/delete/${id}`;
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