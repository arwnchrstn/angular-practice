import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillCalculatorComponent } from './bill-calculator/bill-calculator.component';
import { BillFormComponent } from './components/bill-form/bill-form.component';
import { FormsModule } from '@angular/forms';
import { BillListComponent } from './components/bill-list/bill-list.component';

@NgModule({
  declarations: [
    BillCalculatorComponent,
    BillFormComponent,
    BillListComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    BillCalculatorComponent,
    BillFormComponent,
    BillListComponent
  ]
})
export class BillCalculatorBaseModule { }
