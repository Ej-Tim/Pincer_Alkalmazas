import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
	
	user: User;

	constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) { }
	
	ngOnInit() {
		this.getUser();
	}
	
	getUser(): void {
		const id = + this.route.snapshot.paramMap.get('id');
		this.userService.getUser(id).subscribe(user => this.user = user);
	}

	goBack(): void {
		this.location.back();
	}

}