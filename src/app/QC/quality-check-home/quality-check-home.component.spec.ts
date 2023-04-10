import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityCheckHomeComponent } from './quality-check-home.component';

describe('QualityCheckHomeComponent', () => {
  let component: QualityCheckHomeComponent;
  let fixture: ComponentFixture<QualityCheckHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityCheckHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityCheckHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
