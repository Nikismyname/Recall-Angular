import { NgModule } from "@angular/core"; 
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedOutGuard } from '../services/guards/logged-out.guard';

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [LoggedOutGuard]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule{ }