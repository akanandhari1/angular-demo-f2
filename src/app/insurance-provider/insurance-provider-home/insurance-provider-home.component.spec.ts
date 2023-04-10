import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProviderHomeComponent } from './insurance-provider-home.component';

describe('InsuranceProviderHomeComponent', () => {
  let component: InsuranceProviderHomeComponent;
  let fixture: ComponentFixture<InsuranceProviderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceProviderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProviderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
