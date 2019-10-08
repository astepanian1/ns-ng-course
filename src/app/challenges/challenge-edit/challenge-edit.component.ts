import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { ChallengeService } from '../challenge.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.scss'],
  moduleId: module.id
})
export class ChallengeEditComponent implements OnInit {
  isCreating = true;
  title: string = '';
  description: string = '';

  constructor(

    private activatedRoute: ActivatedRoute,
    private pageRoute: PageRoute,
    private router: RouterExtensions,
    private challengeService: ChallengeService) {

  }
  //In NativeScript Mobile apps pages are cached
  //Therefore ngOnInit will not fire more than once if you navigate back and forth
  //Leading for mode parameter going stale
  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(paramMap =>{
    //   console.log(paramMap.get('mode'));
    // });

    //Use NativeScript PageRoute instead
    this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('mode')) {
          this.isCreating = true;
        }
        else {

          this.isCreating = paramMap.get('mode') !== 'edit';
        }
        if (!this.isCreating) {
          this.challengeService.currentChallenge.pipe(take(1)).subscribe((challenge) => {
            this.title = challenge.title;
            this.description = challenge.description;
          });
        }
      })
    })
  }


  onSubmit(title: string, description: string) {
    //...

    if (this.isCreating) {
      this.challengeService.createNewChallenge(title, description);
    }
    else{
      this.challengeService.updateChallenge(title, description);
    }
    this.router.backToPreviousPage();
  }
}



