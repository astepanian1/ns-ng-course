import { Day, DayStatus } from "./day.model";
import { dayProperty } from "tns-core-modules/ui/date-picker/date-picker";

export class Challenge {

    constructor(
        public title: string,
        public description: string,
        public year: number,
        public month: number,
        private _days: Day[] = []
    ) {
        if (_days.length > 0) {
            return;
        }
        // this.currentYear = new Date().getFullYear();
        // this.currentMonth = new Date().getMonth();
        const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

        for (let i = 1; i < daysInMonth + 1; i++) {
            const date = new Date(this.year, this.month, i);
            const dayInWeek = date.getDay();

            this._days.push({
                dayInMonth: i,
                dayInWeek: dayInWeek,
                date: date,
                status: DayStatus.Open
            });
        }
    }

    get currentDay() {
        return this._days.find(d => d.dayInMonth === new Date().getDate());
    }

    get days() {
        return [...this._days];
    }
}
