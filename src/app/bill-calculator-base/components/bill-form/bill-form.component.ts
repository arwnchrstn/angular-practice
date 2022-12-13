import { Component, EventEmitter, Output } from '@angular/core';

import { ApplianceForm, ApplianceEstimate } from 'src/models';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent {
  @Output() formEventEmitter = new EventEmitter<ApplianceEstimate>()

  rate!: number
  appliance!: ApplianceForm
  private DAYS: number = 30
  private WATTS: number = 1000
  
  constructor() {
    this.rate = 0
    this.initializeForm()
  }

  initializeForm(): void {
    this.appliance = {
      name: '',
      count: 1,
      consumption: 0,
      runtime: 0
    }
  }

  handleSubmit(formData: ApplianceForm): void {
    this.formEventEmitter.emit({
      name: formData.name, 
      count: formData.count, 
      estimate: Math.round((formData.consumption * formData.count / this.WATTS) * this.rate * formData.runtime * this.DAYS)
    } as ApplianceEstimate)
    this.initializeForm()
  }

  handleRateChange(rate: number): void {
    if(rate === null || undefined) {
      this.rate = 0
      return
    }
    this.rate = rate
  }
}
