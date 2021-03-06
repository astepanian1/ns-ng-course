import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppComponent } from "./app.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from "./app-routing.module";
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { ChallengeActionsModule } from "./challenges/challenges-actions/challenge-actions.module";




@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        NativeScriptModule,
        AppRoutingModule,
        ChallengeActionsModule
    ],
    declarations: [
        AppComponent,
        DayModalComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents:[DayModalComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
