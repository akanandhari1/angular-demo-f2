import { Component } from '@angular/core';

@Component({
  selector: 'app-i-provider',
  templateUrl: './i-provider.component.html',
  styleUrls: ['./i-provider.component.scss'],
})
export class IProviderComponent {
  selectedTab = 0;
  provider = '';
  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
    switch (tabIndex) {
      case 1:
        this.provider = 'SBI';
        break;
      case 2:
        this.provider = 'HDFC';
        break;
      case 3:
        this.provider = 'TATA_AIG';
        break;
    }
  }
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
