import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengesActionsComponent } from "./challenges-actions.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    declarations:[ChallengesActionsComponent],
    exports:[ChallengesActionsComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    imports:[
        NativeScriptCommonModule
    ]
})
export class ChallengeActionsModule{

}