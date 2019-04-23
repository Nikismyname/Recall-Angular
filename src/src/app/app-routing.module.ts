import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationModule } from "./authentication/authentication.module"; 
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavigationModule } from "./navigation/navigation.module"; 

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
  },
  {
    path: "auth",
    loadChildren: ()=> AuthenticationModule, 
  },
  {
    path: "nav",
    loadChildren: () => NavigationModule,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
