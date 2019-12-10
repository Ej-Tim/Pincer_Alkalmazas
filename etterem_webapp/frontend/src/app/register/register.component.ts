import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { NgModule } from '@angular/core';

<<<<<<< HEAD
import { User, Role } from './../_models';
import { UserService, RoleService } from '../_services';

=======
import { User } from './../_models';
import { UserService } from '../_services';
>>>>>>> e4f6c5f93f6cbd113197e615d0827538bf258a44


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

<<<<<<< HEAD
	selectedValue: number;
	@Input() user: User = { username: '', password:'' };
	roles: Role[] = [];

	constructor(private userService: UserService, private roleService: RoleService, private location: Location) {
   }

	ngOnInit() {
		this.getRoles();
		this.selectedValue = 1;
	}

	getRoles(): void{
		this.roleService.getRoles().subscribe(roles => this.roles = roles);
	}

	save(): void {
		this.user.role_id = this.selectedValue;
		console.log(this.user);
		this.userService.addUser(this.user).subscribe(() => this.goBack());
=======
	ngOnInit() {}

	save(): void {
	console.log(user);
	this.userService.addUser({ name: this.u_ser, role_id: this.r_id.id, password: this.pass })
      .subscribe((user) => {
        console.log(user);
      }, err => {console.log(err)});
>>>>>>> e4f6c5f93f6cbd113197e615d0827538bf258a44
	}

	goBack(): void {
		this.location.back();
	}
}
