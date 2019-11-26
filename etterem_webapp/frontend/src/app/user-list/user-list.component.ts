import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	users: User[] = [];

	constructor(private route: ActivatedRoute, private userService: UserService) { }

	ngOnInit() {
		this.getUsers();
	}

	getUsers(): void {
		this.userService.getUsers().subscribe(users => this.users = users);
	}
  
	delete(user: User): void {
		this.userService.deleteUser(user).subscribe(success=> {this.getUsers();});		
	}

}