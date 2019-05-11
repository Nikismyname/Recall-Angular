import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BindingFormComponent } from './components/binding-form/binding-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutosizeModule } from 'ngx-autosize';
import { FolderRecursionComponent } from './components/folder-selecting/folder-recursion/folder-recursion.component';
import { FolderSelectorComponent } from './components/folder-selecting/folder-selector/folder-selector.component'; 
import { ItemSelectorComponent } from './components/item-selector-dir/item-selector/item-selector.component';
import { ItemRecursionComponent } from './components/item-selector-dir/item-recursion/item-recursion.component';

const components = [
  BindingFormComponent,
  FolderRecursionComponent,
  FolderSelectorComponent,
  ItemSelectorComponent,
  ItemRecursionComponent,
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
