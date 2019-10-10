import { NgModule } from "@angular/core"
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";
import { TodayComponent } from "./challenges/today/today.component";
import { CurrentChallengeComponent } from "./challenges/current-challenge/current-challenge.component";
import { ChallengeEditComponent } from "./challenges/challenge-edit/challenge-edit.component";
import { ChallengeTabsComponent } from "./challenges/challenge-tabs/challenge-tabs.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [

    { path: 'auth', loadChildren: () => import('~/app/auth/auth.module').then(m => m.AuthModule)},
    {
        path: 'challenges',
        canLoad:[AuthGuard],
        loadChildren: () => import('~/app/challenges/challenges.module').then(m => m.ChallengesModule)
    },
    { path: '', redirectTo: '/challenges/tabs', pathMatch: 'full' }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers:[AuthGuard]
})

export class AppRoutingModule { }

