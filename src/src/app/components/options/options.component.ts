import { Component } from '@angular/core';
import { OptionsStoreService } from 'src/app/services/data-services/options-store-service';
import { IAllOptions } from 'src/app/services/models/options/all-options';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeType } from 'src/app/services/models/options/theme-type';
import { MetaService } from 'src/app/services/meta-servce';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  ThemeType = ThemeType; 

  form: FormGroup;
  options: IAllOptions = null;

  constructor(
    private fb: FormBuilder,
    private optionsService: OptionsStoreService,
    private metaService: MetaService,
    private toastr: ToastrService,
  ) { 
    this.optionsService.options$.pipe(take(1)).subscribe(x => { 
      this.options = x;
      this.form = fb.group({
        "theme": ["", [Validators.required]],
      });
      this.form.patchValue({ theme: this.options.theme });
    });
  }

  get themeTypeKeys() {
    let result: string[] = [];
    for (let enumMember in ThemeType) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
         result = result.concat(enumMember);
      }
    }
    return result;
  }

  onSubmit() {
    this.options.theme =  Number(this.form.value.theme);
    let opts = Object.assign(this.options);
    console.log("submit opt", opts);
    this.metaService.saveOptions(opts).pipe(take(1)).subscribe(x => { 
      this.toastr.success("Options Saved!");
      console.log("submit opt aster call", opts);
      this.optionsService.setAllOptions(opts);
    });
  }
}
