import { Component } from '@angular/core';
import { OptionsStoreService } from 'src/app/services/data-services/options-store-service';
import { IAllOptions } from 'src/app/services/models/options/all-options';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  options: IAllOptions = null;

  constructor(
    private optionsService: OptionsStoreService,
  ) { 
    this.optionsService.options$.pipe(take(1)).subscribe(x => { 
      this.options = x;
    });
  }
}
