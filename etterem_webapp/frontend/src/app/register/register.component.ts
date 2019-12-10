import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { NgModule } from '@angular/core';

import { User } from './../_models';
import { UserService } from '../_services';


  interface Role{
    label: string;
    id: number;
   }
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
	  r_id: Role;
	  u_ser: string;
	  pass: string;
	  roles: Role[];
	constructor(private userService: UserService, private location: Location) {
	  this.roles = [{label:'chef', id: 3}, {label:'waiter', id: 2} ];
     this.r_id = this.roles[0];
   }

	ngOnInit() {}

	save(): void {
	console.log(user);
	this.userService.addUser({ name: this.u_ser, role_id: this.r_id.id, password: this.pass })
      .subscribe((user) => {
        console.log(user);
      }, err => {console.log(err)});
	}

	goBack(): void {
		this.location.back();
	}
}
