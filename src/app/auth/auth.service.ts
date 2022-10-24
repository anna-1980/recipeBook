import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './user.model';

//to store the response from Firebase authentication sign up endpoint
// it is a good practive to define the types of data you work with (look post response data below)
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<UserModel>(); // so we emit the user whenever we login or loggout

  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    // return the observable to know the current state of the request, and subscribe in the component where you use it
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArB2DLkd1wwPiqpGkTAFbHR_tu74zVSlU',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        // errorResponse => {
        //     let errorMesage = 'An unknown error accured!'
        //     if(!errorResponse.error || !errorResponse.error.error){
        //         return throwError(() => new Error(errorMesage));
        //     }
        // switch (errorResponse.error.error.message){
        //     case 'EMAIL_EXISTS':
        //         errorMesage = "this email ID already exists"
        //   }
        //   return  throwError(() => new Error(errorMesage));
        // console.log(errorResponse)
        // }
        // )
        tap((responseDatTap) => {
          this.handleAuthentication(
            responseDatTap.email,
            responseDatTap.localId,
            responseDatTap.idToken,
            +responseDatTap.expiresIn
          );
          //-- geting the token expiry time in mili seconds and wrapping it with Date object which converts it to concrete time, with the mili seconds, so expiry in Data Object form
          //   const expirationDate = new Date(
          //     new Date().getTime() + responseDatTap.expiresIn * 1000
          //   );
          //   const user = new UserModel(
          //     responseDatTap.email,
          //     responseDatTap.localId,
          //     responseDatTap.idToken,
          //     expirationDate
          //   );
          //   this.user.next(user); // using Subject from above code user = new Subject<UserModel>();
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArB2DLkd1wwPiqpGkTAFbHR_tu74zVSlU',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseDatTap) => {
          this.handleAuthentication(
            responseDatTap.email,
            responseDatTap.localId,
            responseDatTap.idToken,
            +responseDatTap.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user); // using Subject from above code user = new Subject<UserModel>();
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMesage = 'An unknown error accured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMesage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMesage = 'this email ID already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMesage = 'This email addres does not exixt';
        break;
      case 'INVALID_PASSWORD':
        errorMesage = 'Email and Password do not match';
        break;
      case 'USER_DISABLED':
        errorMesage = 'You have been BANNED for bad behaviour!';
    }
    return throwError(() => new Error(errorMesage));
  }
}
