import { Component, OnInit, Input } from '@angular/core';
import { isAndroid } from "tns-core-modules/platform";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from 'nativescript-angular/router';
import { UIService } from '../ui.service';

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id 
})
export class ActionBarComponent implements OnInit {
  @Input()
  title: string = "";
  @Input()
  showBackButton = true;
  @Input()
  hasMenu = true;


  constructor(private page: Page, private router: RouterExtensions, private uiService: UIService) { }

  ngOnInit() {
  }


  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  get android() {
    return isAndroid;
  }

  onGoBack() {
    this.router.backToPreviousPage();
  }

  onToggleMenu() {
    this.uiService.toggleDrawer();
  }

  onLoadedActionBar() {
    if (isAndroid) {
      const androidNativeToolBar = this.page.actionBar.nativeView;
      //Currently used both for Back button and Menu Bars hense conditional statement.
      const navigationIcon = androidNativeToolBar.getNavigationIcon();
      let color = "";
      
      //If its a Menu
      if (this.hasMenu) {
        color = '#ffffff';
      }
      //If its a BackButton
      else if(this.canGoBack){
        color = "#171717";
      }

      if (navigationIcon) {
        navigationIcon.setColorFilter(android.graphics.Color.parseColor(color), android.graphics.PorterDuff.Mode.SRC_ATOP);
      }

    }
  }

}
