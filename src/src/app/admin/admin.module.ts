import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminRoutingModule } from './admin-routing.module';

const components = [
  AdminViewComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
