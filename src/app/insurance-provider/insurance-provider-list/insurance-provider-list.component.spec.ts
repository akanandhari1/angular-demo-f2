import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProviderListComponent } from './insurance-provider-list.component';

describe('InsuranceProviderListComponent', () => {
  let component: InsuranceProviderListComponent;
  let fixture: ComponentFixture<InsuranceProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceProviderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
