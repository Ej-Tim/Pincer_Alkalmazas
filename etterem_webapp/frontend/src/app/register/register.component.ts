import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	@Input() user: User = { name: '', email: '', password:'' };
	
	constructor(private userService: UserService, private location: Location) { }

	ngOnInit() {
	}
	
	save(): void {
		this.userService.addUser(this.user).subscribe(() => this.goBack());
	}

	goBack(): void {
		this.location.back();
	}

}