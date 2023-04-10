import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

/**
 * @title Card with actions alignment option
 */
@Component({
  selector: 'app-component',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  public isLogin = false;
  public currentUser: any;
  constructor(private router: Router, public authservice: AuthGuardService) {
    console.log(this.router.url);
  }

  ngOnInit(): void {
    this.authservice.LoginUser.subscribe((res) => {
      this.currentUser = res;
      console.log(res);
      if (res) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
        this.router.navigate(['./login']);
      }
    });
  }
  logOut() {
    this.isLogin = true;
    this.router.navigate(['./login']);
    this.authservice.LoginUser.next(null);
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
