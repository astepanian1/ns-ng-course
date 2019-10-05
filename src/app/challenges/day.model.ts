export interface Day {
    dayInMonth: number;
    dayInWeek: number;
    date: Date;
    status: DayStatus;
}

export enum DayStatus {
    Open,
    Completed,
    Failed
}
