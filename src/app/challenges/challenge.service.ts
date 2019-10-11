import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { Challenge } from "./challenge.model";
import { DayStatus, Day } from "./day.model";
import { take, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class ChallengeService implements OnDestroy {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private userSub: Subscription;

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    constructor(private http: HttpClient, private authService: AuthService) {
        this.userSub = this.authService.user.subscribe((user) => {

            if (!user) {
                this._currentChallenge.next(null);
            }

        });
    }


    fetchCurrentChallenge() {
        return this.authService.user.pipe(
            take(1),
            switchMap((currentUser) => {

                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }

                return this.http.get<{ title: string, description: string, month: number, year: number, _days: Day[] }>(`https://ns-ng-course123.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`)
            }),
            tap(resData => {
                if (resData) {
                    const loadedChallenge = new Challenge(
                        resData.title,
                        resData.description,
                        resData.year,
                        resData.month,
                        resData._days
                    );
                    this._currentChallenge.next(loadedChallenge);
                }
            })
        );


    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(
            title,
            description,
            new Date().getFullYear(),
            new Date().getMonth()
        );

        //Save it to server
        this.saveToServer(newChallenge);
        this._currentChallenge.next(newChallenge);
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe((challenge) => {

            const updateChallenge = new Challenge(title, description, challenge.year, challenge.month, challenge.days);
            //Send To Server
            this.saveToServer(updateChallenge);
            this._currentChallenge.next(updateChallenge);
        })
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {


            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }

            const dayIndex = challenge.days.findIndex((d) => d.dayInMonth === dayInMonth);

            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);
            this.saveToServer(challenge);
        });
    }

    private saveToServer(challenge: Challenge) {

        this.authService.user.pipe(
            take(1),
            switchMap((currentUser) => {

                if (!currentUser || !currentUser.isAuth) {
                    return of(null);
                }

                return this.http.put(`https://ns-ng-course123.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`, challenge)
            })
        ).subscribe((result) => {
            console.log(result);
        });



    }

    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe
        }
    }
}
