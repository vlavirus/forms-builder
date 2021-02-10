import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit  } from '@angular/core';

import * as fromFields from 'app/core';
import { AddNewOption, AddStyleToField } from 'app/core/fields/fields.action';
import { StyleItemModel } from 'app/shared/models/style-item.model';

@Component({
  selector: 'app-form-page-styling-item',
  templateUrl: './form-page-styling-item.component.html',
  styleUrls: ['./form-page-styling-item.component.scss']
})

export class FormPageStylingItemComponent implements OnInit {

  @Input() currentItem;
  @Input() defaultItem;

  public panelOpenState = true;
  public form = new FormGroup({});

  public formOption = new FormGroup({
    optionControl: new FormControl('', [])
  });


  constructor(
    private storeFields: Store<fromFields.State>
  ) { }

  ngOnInit(): void {
    this.currentItem.style.forEach((style) => {
      this.form.addControl(style.name, new FormControl(style.value, []));
    });
  }

  onSubmit(): void {
    this.storeFields.dispatch(new AddStyleToField({id: this.currentItem.id, styles: this.form.value}));
    this.form.reset();
  }

  public findStyle(styleName: string, styleContainer: StyleItemModel[]): StyleItemModel {
    return styleContainer.find((style) => {
      return style.name === styleName ;
    });
  }

  public addOption(): void {
    this.storeFields.dispatch(new AddNewOption({id: this.currentItem.id, option: this.formOption.value}));
    this.panelOpenState = true;
  }

}
