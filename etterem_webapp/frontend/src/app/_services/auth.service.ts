import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  id?: number
  role?: string
  username: string
  password: string
  exp?: number
}

interface TokenResponse {
  token: string
}

export interface TokenPayload {
  id?: number
  role?: string
  username: string
  password: string
}


@Injectable()
export class AuthService {
  private token: string
  private BASE_URL: string = 'http://localhost:5000'
  //private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private http: HttpClient, private router: Router) { }

  private saveToken (token: string): void {
    localStorage.setItem('userToken', token)
    this.token = token
  }

  private getToken (): string {
    if(!this.token){
      this.token = localStorage.getItem('userToken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if(token){
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if(user){
      return user.exp > Date.now() / 1000
    }else{
      return false
    }
  }

  public register (user: TokenPayload): Observable<any> {
    const base = this.http.post(this.BASE_URL + '/user/add', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })
    )
    console.log(request)
    return request
  }

  public login (user: TokenPayload): Observable<any> {
    const base = this.http.post(this.BASE_URL + '/login', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('userToken')
    this.router.navigateByUrl('/')
  }
  /*
  login(user): Promise<any> {
    let url: string = `${this.BASE_URL}/login`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  register(user): Promise<any> {
    let url: string = `${this.BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }
  */
}
