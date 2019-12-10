import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { User, Role } from './../_models';
import { UserService, RoleService } from '../_services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

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
	}

	goBack(): void {
		this.location.back();
	}
}
