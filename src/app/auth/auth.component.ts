import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
 

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoggedInMode: boolean = true; //see the onSwitchMode() method below
  isLoading: boolean = false;
  error: string = null;
  // userDetails? = null;
  userDetails? = localStorage.getItem('userLoginDatagit')

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user)=>{
      console.log(user.email)
      this.userDetails = user.email
    }) 
    console.log(this.userDetails)

  }

  onSwitchMode(){
    this.isLoggedInMode = !this.isLoggedInMode  /// change it to what it is currently NOT, so switch
    console.log(this.isLoggedInMode)
  }

  onSubmit(form: NgForm){
    // console.log(form.value);
    if (!form.valid) {
      return; // so that user cannot disable disablening the sign up button from the browser developer tools
    }
    const email = form.value.email;
    const password = form.value.password;

    // to avoid repeating if the subscribe block:
    let authObservables: Observable<AuthResponseData>;

    this.isLoading = true;
   //---- log in mode -------//
    if (this.isLoggedInMode) {
      authObservables = this.authService.logIn(email, password);
    } else {
      authObservables = this.authService.signUp(email, password);
    }
    console.log(this.isLoggedInMode);

    // one of the two observables will be sotred in let authObservables and we can share this code is the current observable state
    authObservables.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']) // programatic type of navigation
      },
      (errorMessageFromAuthService) => {
        console.log(errorMessageFromAuthService);
        this.error = errorMessageFromAuthService;
        this.isLoading = false;
      }
    )
    form.reset();
  }

  onCloseErrorClicked(){
    this.error = null
  }

}
