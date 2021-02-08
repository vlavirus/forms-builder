import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import * as fromFields from 'app/core';
import { getCurrentFields, getStaticFields } from 'app/core';
import { FormElementModel } from 'app/shared/models/form-element.model';

@Component({
  selector: 'app-form-page-styling',
  templateUrl: './form-page-styling.component.html',
  styleUrls: ['./form-page-styling.component.scss']
})

export class FormPageStylingComponent implements OnInit, OnDestroy {

  public fields$: Observable<any>;
  public ngUnsubscribe$ = new Subject<void>();

  public form = new FormGroup({});
  public panelOpenState = false;
  public defaultFields: FormElementModel[];

  constructor(
    private storeFields: Store<fromFields.State>
  ) {}

  ngOnInit(): void {
    this.fields$ = this.storeFields.select(getCurrentFields).pipe(takeUntil(this.ngUnsubscribe$));
    this.storeFields.select(getStaticFields).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
      res => {
        if (res) {
          this.defaultFields = [ ...res ];
        }
      }
    );
  }

  public findDefaultFormElement(currentFormElement: FormElementModel): FormElementModel {
    return this.defaultFields.find(item => item.type === currentFormElement.type);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
