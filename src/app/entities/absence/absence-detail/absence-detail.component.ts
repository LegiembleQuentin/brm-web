import {Component, Input} from '@angular/core';
import {Absence} from "../../../api/absence";

@Component({
  selector: 'app-absence-detail',
  templateUrl: './absence-detail.component.html',
  styleUrls: ['./absence-detail.component.scss']
})
export class AbsenceDetailComponent {
  @Input() absence!: Absence;
  display: boolean = false;

  showDetail(absence: Absence) {
    this.display = true;
    this.absence = absence;
  }

  hideDetail(): void {
    this.display = false;
  }

}
