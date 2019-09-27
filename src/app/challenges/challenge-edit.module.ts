import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengeEditComponent } from "./challenge-edit/challenge-edit.component";
import { SharedModule } from "../shared/shared.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    declarations:[ChallengeEditComponent],
    imports: [
      
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        //HINT: Must Register twice because in above below scenario it registers routes but doesnt unlock routing features
        //when you only call .forChild or forRoot
        NativeScriptRouterModule.forChild([{ path:'', component:ChallengeEditComponent}]),
        SharedModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class ChallengeEditModule{}