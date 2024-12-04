import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'jwt-auth-app';


  constructor() {
  }

  ngOnInit() {

  }
}
