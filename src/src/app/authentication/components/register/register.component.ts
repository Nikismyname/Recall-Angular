import { Component } from '@angular/core';
import { FormInputData } from "../../../services/models/others/form-input-data";
import { FormData } from "../../../services/models/others/form-data";
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesNoSlash } from "../../../services/route-paths";
import { IRegisterData } from 'src/app/services/models/authentication/register-data';
import { UserService } from "../../../services/user.service";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  successSub: Subscription;
  formData: FormData;
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    this.formData = this.generateForm();
  }

  generateForm(): FormData {
    return new FormData(
      [
        new FormInputData("username", "Username", "string", null,
          [
            Validators.required,
            Validators.minLength(3)
          ],
          {
            minLength: "Username must be at least three characters long!",
          }),
        new FormInputData("password", "Password", "password", null,
          [
            Validators.required,
            Validators.minLength(6),
          ],
          {
            minLength: "Password must be at least six caracters long!",
          }),
        new FormInputData("repeatPassword", "Repeat Password", "password"),
        new FormInputData("firstName", "First Name", "string", null,
          [
            Validators.required,
            Validators.minLength(2),
          ],
          {
            minLength: "First Name must be at least two character long!",
          }),
        new FormInputData("lastName", "Last Name", "string", null,
          [
            Validators.required,
            Validators.minLength(2),
          ],
          {
            minLength: "Last Name must be at least two character long!",
          }),
      ],
      "Register Form", "Register", false, false);
  }

  onFormSubmit(data: IRegisterData) {
    this.userService.register(data).pipe(take(1)).subscribe(
      () => {
        this.router.navigate([RoutesNoSlash.loginPath]);
      },
      error => {
        console.log("REGISTER_FAILED");
      }
    )
  }

}
