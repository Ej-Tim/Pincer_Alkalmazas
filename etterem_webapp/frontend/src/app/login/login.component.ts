import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	  u_ser: string;
	  pass: string;
    constructor(private auth: AuthService) {}

    ngOnInit(): void {}

    log_in() {
      this.auth.login({username: this.u_ser, password: this.pass}).subscribe((user) => {
        console.log(user);
      }, err => {console.log(err)});
    }
}
