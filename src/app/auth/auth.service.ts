import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './user.model';
import { environment } from 'src/environments/environment';

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
  // user = new Subject<UserModel>(); // so we emit the user whenever we login or loggout, this also stores the Token
  user = new BehaviorSubject<UserModel>(null); // additionally provides subscribes immidiate access to the previously emitted value even if there were not subscribe to it, that is why it has to be initiatd with a starter value
  // now it the dataStorage service you can reach out to get the user data

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  autoLoginFromLocalStorage() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userLoginData'));
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      //---- here to pass the remaining time has to be calculated ----//
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLoggout(expirationDuration);
    }
  }

  signUp(email: string, password: string) {
    // return the observable to know the current state of the request, and subscribe in the component where you use it
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
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
    localStorage.setItem('userLoginData', JSON.stringify(user));

    //--- auto loggout, it needs the token expiration time from here--//
    this.autoLoggout(expiresIn * 1000);
    // console.log(expirationDate)
    // console.log(expiresIn)
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

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userLoginData');

    //clearning the logoutTimer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    
  }

  autoLoggout(expirationDuration: number) {
    // it will be called whenever a new User is emitted into or application
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      // console.log('logged out');
    }, expirationDuration);
    console.log(this.tokenExpirationTimer);
  }
}
