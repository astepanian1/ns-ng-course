import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css']
})
export class ChallengeEditComponent implements OnInit {
 challengeDescription:string = '';
 
 @Output()
  challengeChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


33
  onSetChallenge(){
    this.challengeChanged.emit(this.challengeDescription);
  }
}
