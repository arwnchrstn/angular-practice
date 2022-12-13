import { Component } from '@angular/core';
import { ApplianceEstimate } from 'src/models';

@Component({
  selector: 'app-bill-calculator',
  templateUrl: './bill-calculator.component.html',
  styleUrls: ['./bill-calculator.component.css']
})
export class BillCalculatorComponent {
  private applianceList!: ApplianceEstimate[]
  totalEstimate!: number

  constructor() {
    this.applianceList = []
    this.totalEstimate = 0
  }
  
  addAppliance(newAppliance: ApplianceEstimate): void {
    this.applianceList.push(newAppliance)
    this.totalEstimate += newAppliance.estimate
  }

  getAppliances(): ApplianceEstimate[] {
    return this.applianceList
  }
}
