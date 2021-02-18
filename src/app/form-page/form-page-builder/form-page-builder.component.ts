import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import * as fromFields from 'app/core';
import { getCurrentFields, getGeneralStyle } from 'app/core';
import { AddFieldAction } from 'app/core/fields/fields.action';
import { StyleItemModel } from 'app/shared/models/style-item.model';
import { FormElementModel } from 'app/shared/models/form-element.model';

@Component({
  selector: 'app-form-page-builder',
  templateUrl: './form-page-builder.component.html',
  styleUrls: ['./form-page-builder.component.scss']
})
export class FormPageBuilderComponent implements OnInit, OnDestroy {

  public ngUnsubscribe$ = new Subject<void>();
  public formData = [];
  public form = new FormGroup({});
  public show: boolean;
  public styleExp = {};

  constructor(
    private storeFields: Store<fromFields.State>
  ) { }

  ngOnInit(): void {
    this.storeFields.select(getCurrentFields)
       .pipe(takeUntil(this.ngUnsubscribe$))
       .subscribe(
          res => {
            this.formData = [...res];
            this.updateControls(res);
            this.setValidators(res);
          });
    this.storeFields.select(getGeneralStyle)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        res => {
          res.forEach(item => {
            // @ts-ignore
            this.styleExp[item.name] = `${item.value}${item.measurement}`;
          });
        }
      );
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const addedObject = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
      this.storeFields.dispatch(new AddFieldAction({index: event.currentIndex, item: addedObject}));
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  private setValidators(fields: FormElementModel[]): void {
    fields.forEach(field => {
      // @ts-ignore
      (field.style.find(({name}) => name === 'required')?.value === 'true') ?
        this.form.controls[field.id].setValidators(Validators.required) :
        // @ts-ignore
        (field.style.find(({name}) => name === 'required')?.value === 'false') ?
          this.form.controls[field.id].clearValidators() : null;
    });
  }

  private updateControls(fields: FormElementModel[]): void {
    fields.forEach(item => {
      if (item.type !== 'button') {
        this.form.contains(item.id) ? null : this.form.addControl(item.id, new FormControl('', []));
      }
    });

    for (const controlId in this.form.controls) {
      fields.find(({id}) => id === controlId) ? null :  this.form.removeControl(controlId);
    }
  }

  findCurrentStyleValue(styleName: string, styleArray: StyleItemModel[]): string {
    return <string> styleArray.find(style => style.name === styleName).value;
  }

  onShowClick(): void {
    this.show = !this.form.valid;
    console.log(this.form.value);
  }
}

