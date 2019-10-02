import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ns-challenges-actions',
  templateUrl: './challenges-actions.component.html',
  styleUrls: ['./challenges-actions.component.scss']
})
export class ChallengesActionsComponent implements OnInit {
@Output()
actionSelect = new EventEmitter<'complete'| 'fail' |'cancel'> ();
@Input()
cancelText = 'Cancel';

  constructor() { }

  ngOnInit() {
  }


  onAction(action:'complete'| 'fail' |'cancel'){
    this.actionSelect.emit(action);
  }
}
