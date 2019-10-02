import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengesActionsComponent } from "./challenges-actions.component";

@NgModule({
    declarations:[ChallengesActionsComponent],
    exports:[ChallengesActionsComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class ChallengeActionsModule{

}