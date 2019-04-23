import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindingFormComponent } from './components/binding-form/binding-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';

const components = [
  BindingFormComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutosizeModule
  ],
  exports: [...components]
})
export class SharedModule { }
