import { Component, Input } from '@angular/core';
import { ApplianceEstimate } from 'src/models';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent {
  @Input() applianceList!: ApplianceEstimate[]
  @Input() total!: number
}
