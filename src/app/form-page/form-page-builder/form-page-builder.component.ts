import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import * as fromFields from 'app/core';
import { getCurrentFields } from 'app/core';
import { AddFieldAction } from 'app/core/fields/fields.action';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-page-builder',
  templateUrl: './form-page-builder.component.html',
  styleUrls: ['./form-page-builder.component.scss']
})

export class FormPageBuilderComponent implements OnInit, OnDestroy {

  public ngUnsubscribe$ = new Subject<void>();
  public formData = [];
  public form = new FormGroup({});

  constructor(
    private storeFields: Store<fromFields.State>
  ) { }

  ngOnInit(): void {
    this.storeFields.select(getCurrentFields)
     .pipe(takeUntil(this.ngUnsubscribe$))
     .subscribe(
        res => {
          this.formData = [...res];
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

  private generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  onShowClick(): void {
    console.log(this.form.value);
  }
}

