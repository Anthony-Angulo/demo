import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';
import {User} from '../../interfaces/users';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  user: User;
  imageSrc: any;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('Usuario') || '{}');
    console.log(this.user)
    this.imageSrc = `data:image/png;base64,${this.user.img}`;
  }

  logOut(){
    this.auth.logOut();
    this.router.navigate(['/login'])
  }

  goTo(){
    this.router.navigate(['/dashboard'])
  }

}
