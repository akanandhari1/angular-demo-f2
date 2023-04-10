import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-landing',
  templateUrl: './customer-landing.component.html',
  styleUrls: ['./customer-landing.component.scss'],
})
export class CustomerLandingComponent implements OnInit {
  constructor() {}
  public customerhomescreen = true;
  ngOnInit(): void {}
  navigate(event: any) {
    if (event == 1) {
      this.customerhomescreen = false;
    } else {
      this.customerhomescreen = true;
    }
  }
}
