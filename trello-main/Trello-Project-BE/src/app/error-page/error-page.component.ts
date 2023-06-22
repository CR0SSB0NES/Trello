import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.less']
})
export class ErrorPageComponent implements OnInit {

  constructor(public route: Router) { }

  ngOnInit(): void {}

  goToLogin() {
    setTimeout(() => {
      this.route.navigate(['login'])
    }, 300);
  }

}
