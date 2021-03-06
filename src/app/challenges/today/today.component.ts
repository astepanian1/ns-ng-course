import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChallengeService } from '../challenge.service';
import { Day, DayStatus } from '../day.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ns-today',
    templateUrl: './today.component.html',
    styleUrls: ['./today.component.scss'],
    moduleId: module.id
})
export class TodayComponent implements OnInit, OnDestroy {
    currentDay: Day;
    currentChallengeSub: Subscription;

    constructor(private challengeService: ChallengeService) { }

    ngOnInit() {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe((challenge) => {
            if (challenge) {
                this.currentDay = challenge.currentDay;
            }
        });
    }

    onActionSelected(dayStatus: DayStatus) {
        this.challengeService.updateDayStatus(this.currentDay.dayInMonth, dayStatus)
        console.log(dayStatus);
    }

    getActionName() {
        if (this.currentDay.status === DayStatus.Completed) {
            return 'complete';
        }
        else if (this.currentDay.status === DayStatus.Failed) {
            return 'fail';
        }
        else {
            return null;
        }
    }

    ngOnDestroy() {
        if (this.currentChallengeSub)
            this.currentChallengeSub.unsubscribe();
    }
}
