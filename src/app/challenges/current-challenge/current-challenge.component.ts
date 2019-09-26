import { Component, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "~/app/shared/ui/ui.service";

declare var android:any;

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
    moduleId: module.id
})
export class CurrentChallengeComponent {

    constructor(private modalDialog:ModalDialogService, private vcRef:ViewContainerRef,private uiService:UIService) {
        
        
    }
    
    //Edit value is passed to parameter :mode
    onChangeStatus(){
        this.modalDialog.showModal(DayModalComponent,{
            fullscreen:true,
            viewContainerRef: this.uiService.getRootVCRef(),
            context:{date: new Date()}
        }).then((action:string)=>{
            console.log(action);
        });
    }


}





