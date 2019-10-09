import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const FIREBASE_API_KEY = 'AIzaSyBQ3TDsjc9jZnTb0nFRWJuT3Pe02VsNJJk'


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) {


  }

  signUp(email: string, password: string) {
    
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  login(email: string, password: string) {
    
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }


}
