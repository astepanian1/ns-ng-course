import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { UIService } from "./shared/ui/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent, { static: false })
    drawerComponent: RadSideDrawerComponent;
    activeChallenge: string = '';

    private drawerSub: Subscription;
    private drawer: RadSideDrawer;


    constructor(private uiService: UIService, private changeDetectionRef: ChangeDetectorRef, private vcRef: ViewContainerRef, private authService: AuthService) {


    }

    ngOnInit() {

        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });

        this.uiService.setRootVCRef(this.vcRef);
      
    }

    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
    }
    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
    }

    ngAfterViewInit() {

        this.drawer = this.drawerComponent.sideDrawer;

        this.changeDetectionRef.detectChanges();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

}