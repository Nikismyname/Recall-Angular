import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormData as myFormData } from "../../../services/models/others/form-data";
import { Location } from '@angular/common';

@Component({
  selector: 'app-binding-form',
  templateUrl: './binding-form.component.html',
  styleUrls: ['./binding-form.component.css']
})
export class BindingFormComponent implements OnInit {

  form: FormGroup;
  loaded: boolean = false;
  @Input() formData: myFormData;
  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private location: Location,
  ) { }
 
  ngOnInit() {
    let formControlsGroup = {};
    for (let i = 0; i < this.formData.inputData.length; i++) {
      const input = this.formData.inputData[i];
      formControlsGroup[input.name] = ["", input.validations];
    }
    this.form = this.fb.group(formControlsGroup);
    for (let i = 0; i < this.formData.inputData.length; i++) {
      const input = this.formData.inputData[i];
      this.form.patchValue({ [input.name]: input.data });
    }
    this.loaded = true;
  }

  onClickBack() {
    this.location.back();
  }

  onSubmit() {
    this.onFormSubmit.emit(this.form.value);
  }

  get controls() {
    return this.form.controls;
  }

}
