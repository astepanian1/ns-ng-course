import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppComponent } from "./app.component";
import { CurrentChallengeComponent } from "./challenges/current-challenge/current-challenge.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ChallengeEditComponent } from './challenges/challenge-edit/challenge-edit.component';
import { AuthComponent } from './auth/auth.component';
import { TodayComponent } from './challenges/today/today.component';
import { AppRoutingModule } from "./app-routing.module";
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
import { ChallengeTabsComponent } from './challenges/challenge-tabs/challenge-tabs.component';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { DayModalComponent } from './challenges/day-modal/day-modal.component';


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptUISideDrawerModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CurrentChallengeComponent,
        ChallengeEditComponent,
        AuthComponent,
        TodayComponent,
        ActionBarComponent,
        ChallengeTabsComponent,
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
