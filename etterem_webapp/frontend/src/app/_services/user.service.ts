import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './../_models';

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
export class UserService {

  private url = 'http://localhost:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }
  
  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<any> {
    const url = `${this.url}/user/${id}`;
    return this.http.get<User>(url);
  }
  
  /** POST: add a new user to the server */
  addUser(user: User) {
	//console.log(user);
    return this.http.post(this.url + '/user/add', user, httpOptions);
  }
  
  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.url + '/user/update', user, httpOptions);
  }
  
  /** DELETE: delete the user from the server */
  deleteUser(user: User | number) {
	  if (confirm("Are you sure to delete?")) {
		const id = typeof user === 'number' ? user : user.id;
		const url = `${this.url}/user/delete/${id}`;
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