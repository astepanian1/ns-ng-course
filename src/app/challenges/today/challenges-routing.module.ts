import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ChallengeTabsComponent } from "../challenge-tabs/challenge-tabs.component";
import { TodayComponent } from "./today.component";
import { CurrentChallengeComponent } from "../current-challenge/current-challenge.component";
import { Routes } from "@angular/router";

const routes: Routes = [
	{
		path: 'tabs', component: ChallengeTabsComponent, children: [
			{ path: 'today', component: TodayComponent, outlet: 'today' },
			{ path: 'current-challenge', component: CurrentChallengeComponent, outlet: 'currentChallenge' },
		]
	},
	{ path: ':mode', loadChildren: () => import('~/app/challenges/challenge-edit.module').then(m => m.ChallengeEditModule) },
	{ path: '', redirectTo: "/challenges/tabs", pathMatch: 'full' }
];

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
	exports: [NativeScriptRouterModule]
})
export class ChallengesRoutingModule { }