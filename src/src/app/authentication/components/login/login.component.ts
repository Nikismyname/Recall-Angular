import { Component } from '@angular/core';
import { FormInputData } from "../../../services/models/others/form-input-data";
import { FormData } from "../../../services/models/others/form-data";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginData } from 'src/app/services/models/authentication/login-data';
import { UserService } from "../../../services/user.service";
import { take } from "rxjs/operators" 
import { AuthStoreService } from 'src/app/services/DataServices/auth-store.service';
import { IUser } from 'src/app/services/models/authentication/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  successSub: Subscription;
  formData: FormData = new FormData(
    [
      new FormInputData("username", "Username", "string"),
      new FormInputData("password", "Password", "password"),
    ],
    "Login Form", "Login", false);


  constructor(
    private userService: UserService,
    private authStoreService: AuthStoreService,
    private router: Router,
  ) {
  }

  onFormSubmit(data: ILoginData) {
    this.userService.login(data).pipe(take(1)).subscribe(
      loginData => {
        let setUserData: IUser = {
          username: loginData.username,
          role: loginData.role,   
          token: loginData.token,
        }; 
        this.authStoreService.setUser(setUserData);

        this.router.navigate([""]);

        localStorage.setItem("user", JSON.stringify(setUserData));
        localStorage.setItem("token", setUserData.token)
      },
      error => {
        console.log("LOGIN_FAIL");
      })
  }
}
