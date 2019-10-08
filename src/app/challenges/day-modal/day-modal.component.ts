import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { DayStatus } from '../day.model';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss'],
  moduleId: module.id
})
export class DayModalComponent implements OnInit {
  loadedDate: Date;
  loadedStatus: 'complete' | 'fail' = null;

  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit() {
    this.loadedDate = <Date>this.modalParams.context.date;
    if(<DayStatus>this.modalParams.context.status === DayStatus.Completed){
      this.loadedStatus = 'complete';
    } else if(<DayStatus>this.modalParams.context.status === DayStatus.Failed){
      this.loadedStatus = 'fail';
    }
    else{
      this.loadedStatus = null;
    }
  }

  onHandleInput(action: DayStatus) {
    this.modalParams.closeCallback(action);
  }
}


