import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError} from "rxjs/operators";

//to store the response from Firebase authentication sign up endpoint
// it is a good practive to define the types of data you work with (look post response data below)
export interface AuthResponseData{
    kind: string;
    idToken: string; 
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
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
        catchError(this.handleError)
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
      .pipe(catchError(this.handleError));
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