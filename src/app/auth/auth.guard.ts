import { Injectable } from '@angular/core';
import { Route, CanLoad, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { take, switchMap, tap } from 'rxjs/operators';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService,private router:RouterExtensions) {

  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(take(1), switchMap((currentUser) => {
      //trying to auto login at guard level
      if (!currentUser || !currentUser.token) {
        return this.authService.autoLogin();
      }
      //if we got here then we have current user with active token so we good.
      return of(true);
    }),
    tap((isAuth) =>{
     if(!isAuth){
            this.router.navigate(["/auth"]);
          }
    })

    );
  }

}

