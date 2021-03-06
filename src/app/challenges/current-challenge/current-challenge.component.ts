import { Component, ViewContainerRef, OnInit, OnDestroy } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/ui/ui.service";
import { ChallengeService } from "../challenge.service";
import { Challenge } from "../challenge.model";
import { Subscription } from "rxjs";
import { Day, DayStatus } from "../day.model";

declare var android: any;

@Component({
    selector: "ns-current-challenge",
    templateUrl: "./current-challenge.component.html",
    styleUrls: ["./current-challenge.component.scss"],
    moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {

    weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    currentChallenge: Challenge;
    private currentChallengeSub: Subscription;

    constructor(
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private challengeService: ChallengeService
    ) {

    }

    //Edit value is passed to parameter :mode
    onChangeStatus(day: Day) {


        if (!this.getIsSettible(day.dayInMonth)) {
            return false;
        }

        this.modalDialog
            .showModal(DayModalComponent, {
                fullscreen: true,
                viewContainerRef: this.uiService.getRootVCRef(),
                context: { date: day.date, status: day.status }
            })
            .then((status: DayStatus) => {

                if (status === DayStatus.Open) {
                    return;
                }

                this.challengeService.updateDayStatus(day.dayInMonth, status);
            });
    }



    ngOnInit() {
        this.currentChallengeSub = this.challengeService.currentChallenge.subscribe(
            challenge => {
                this.currentChallenge = challenge;
            }
        );
    }
    getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {

        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

        return startRow + weekRow + irregularRow;
    }

    ngOnDestroy() {
        if (this.currentChallengeSub) {
            this.currentChallengeSub.unsubscribe();
        }
    }

    getIsSettible(dayInMonth: number) {

        return dayInMonth <= new Date().getDate();

    }
}
