import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindingFormComponent } from './components/binding-form/binding-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { FolderRecursionComponent } from './components/folder-selecting/folder-recursion/folder-recursion.component';
import { FolderSelectorComponent } from './components/folder-selecting/folder-selector/folder-selector.component'; 

const components = [
  BindingFormComponent,
  FolderRecursionComponent,
  FolderSelectorComponent,
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
