import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCalculatorComponent } from './bill-calculator.component';

describe('BillCalculatorComponent', () => {
  let component: BillCalculatorComponent;
  let fixture: ComponentFixture<BillCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
