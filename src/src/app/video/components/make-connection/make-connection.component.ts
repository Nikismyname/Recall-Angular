import { Component } from '@angular/core';
import { DirectoryService } from 'src/app/services/directory.service';
import { ActivatedRoute } from '@angular/router';
import { IDirWithItemsSelect } from 'src/app/services/models/others/dir-with-items-select';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConnectionType } from 'src/app/services/models/enums/connection-type';

@Component({
  selector: 'app-make-connection',
  templateUrl: './make-connection.component.html',
  styleUrls: ['./make-connection.component.css']
})
export class MakeConnectionComponent {

  ConnectionType = ConnectionType;
  connectionTypeKeys: string[];
  allItems: IDirWithItemsSelect[];
  itemsLoaded: boolean = false;
  selectingItem: boolean = true;
  videoOneId: number;
  videoTwoId: number;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dirService: DirectoryService,
    private route: ActivatedRoute,
  ) {
    this.videoOneId = Number(this.route.snapshot.paramMap.get("id"));

    this.connectionTypeKeys = Object.keys(this.ConnectionType).filter(x => isNaN(Number(x)) === false);

    this.setForm();

    this.dirService.getAllItems().pipe(take(1)).subscribe(x => {
      this.allItems = x;
      this.itemsLoaded = true;
    });
  }

  itemSelected(ids: number[]) {
    let id = ids[0];
    this.videoTwoId = id;
    if (this.videoOneId === this.videoTwoId) {
      alert("You can not connect a video to itself!");
      return;
    }

    this.selectingItem = false;
  }

  setForm() {
    this.form = this.fb.group({
      strength: ["", [Validators.required, this.strengthValidator]],
      name: ["", [Validators.required]],
      type: ["", Validators.required],
    });
  }

  strengthValidator = (c: FormControl) => {
    if (c.value >= 1 && c.value <= 10) {
      return null;
    } else {
      return { outOfRangeStrengthValue: true };
    }
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(this.form);
  }

  get c() { 
    return this.form.controls;
  }
}
