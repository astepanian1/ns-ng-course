import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from './user.model';
import { RouterExtensions } from 'nativescript-angular/router';
import { getString, setString, hasKey, remove } from 'tns-core-modules/application-settings'

const FIREBASE_API_KEY = 'AIzaSyBQ3TDsjc9jZnTb0nFRWJuT3Pe02VsNJJk'

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: number;

  constructor(private http: HttpClient, private routher: RouterExtensions) {


  }

  get user() {
    return this._user.asObservable();
  }

  signUp(email: string, password: string) {

    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        catchError((err) => {

          this.handleError(err.error.error.message);

          return throwError(err);
        }),
        tap((response) => {
          if (response && response.idToken) {

            this.handleLogin(email, response.idToken, response.localId, parseInt(response.expiresIn));
          }
        })
      )
  }

  login(email: string, password: string) {

    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError((err) => {

        this.handleError(err.error.error.message);

        return throwError(err);
      }),
        tap((response) => {
          if (response && response.idToken) {

            this.handleLogin(email, response.idToken, response.localId, parseInt(response.expiresIn));
          }
        })
      )
  }


  autoLogout(expiryDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> this.logout(), expiryDuration);
  }

  autoLogin() {
    if (!hasKey("userData")) {
      return of(false);
    }

    const userData: { email: string, id: string, _token: string, _tokenExpirationDate: string } = JSON.parse(getString("userData"));

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.isAuth) {
      this._user.next(loadedUser);
      this.autoLogout(loadedUser.timeToExpiry);

      return of(true);
    }
    else {
      return of(false);
    }
  }
  private handleLogin(email: string, token: string, userId: string, expiresIn: number) {
    //Calculating expirationDate = CurrentTime + ExpiresIn * 1000 to Convert seconds to miliseconds.
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);


    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.autoLogout(user.timeToExpiry);
    setString("userData", JSON.stringify(user));
    this._user.next(user);
  }

  logout() {
    this._user.next(null);
    remove("userData");

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }


    this.routher.navigate(['/auth'], { clearHistory: true })
  }




  private handleError(errorMessage: string) {
    switch (errorMessage) {
      case "EMAIL_EXISTS":

        alert('This email address already exists!')
        break;
      case "INVALID_PASSWORD":
        alert('Your password is invalid!')
        break;
      default:
        alert('Authentication failed, check your credentials!')
        break;
    }
  }

}
