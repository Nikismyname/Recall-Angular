import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationModule } from "./authentication/authentication.module"; 
import { NavigationModule } from "./navigation/navigation.module"; 
import { AdminModule } from "./admin/admin.module";
import { VideoModule } from './video/video.module';
import { PublicModule } from './public/public.module';

import { OptionsComponent } from './components/options/options.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePageComponent,
  },
  {
    path: "options",
    component: OptionsComponent,
  },
  {
    path: "auth",
    loadChildren: ()=> AuthenticationModule, 
  },
  {
    path: "nav",
    loadChildren: () => NavigationModule,
  },
  {
    path: "video", 
    loadChildren: () => VideoModule,
  },
  {
    path: "admin", 
    loadChildren: () => AdminModule,
  },
  {
    path: "public",
    loadChildren: () => PublicModule,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
