import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import * as fromFields from 'app/core';
import { getCurrentFields, getGeneralStyle, getStaticFields } from 'app/core';
import { FormElementModel } from 'app/shared/models/form-element.model';
import { AddGeneralStyle } from 'app/core/fields/fields.action';

@Component({
  selector: 'app-form-page-styling',
  templateUrl: './form-page-styling.component.html',
  styleUrls: ['./form-page-styling.component.scss']
})

export class FormPageStylingComponent implements OnInit, OnDestroy {

  public fields$: Observable<any>;
  public ngUnsubscribe$ = new Subject<void>();

  public form = new FormGroup({});
  public defaultFields: FormElementModel[];
  public panelOpenStyleList: boolean;
  public panelOpenGeneralStyle: boolean;
  public generalStyle$: Observable<any>;

  constructor(
    private storeFields: Store<fromFields.State>
  ) {}

  ngOnInit(): void {
    this.fields$ = this.storeFields.select(getCurrentFields);
    this.storeFields.select(getStaticFields).pipe(
      filter(res => !!res),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe(res => this.defaultFields = [ ...res ]);

    this.generalStyle$ = this.storeFields.select(getGeneralStyle).pipe(
      filter(res => !!res),
      takeUntil(this.ngUnsubscribe$));

    this.generalStyle$.subscribe(res =>
      res.forEach((style) => {
          this.form.addControl(style.name, new FormControl(style.value, []));
      })
    );
  }

  public findDefaultFormElement(currentFormElement: FormElementModel): FormElementModel {
    return this.defaultFields.find(item => item.type === currentFormElement.type);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }

  onSubmit(): void {
    this.storeFields.dispatch(new AddGeneralStyle({style: this.form.value}));
  }
}
