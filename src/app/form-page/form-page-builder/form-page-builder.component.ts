import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as fromFields from 'app/core';
import { getCurrentFields } from 'app/core';
import { AddFieldAction } from 'app/core/fields/fields.action';
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
  public show = false;

  constructor(
    private storeFields: Store<fromFields.State>
  ) { }

  ngOnInit(): void {
    this.storeFields.select(getCurrentFields)
     .pipe(takeUntil(this.ngUnsubscribe$))
     .subscribe(
        res => {
          this.formData = [...res];
          this.setValidators(res);
        });
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const addedObject = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
      if (addedObject.type !== 'button') {
        this.form.addControl(addedObject.id, new FormControl('', []));
      }
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

  onShowClick(): void {
    this.form.valid ? this.show = false : this.show = true;
    console.log(this.form.value);
  }
}

