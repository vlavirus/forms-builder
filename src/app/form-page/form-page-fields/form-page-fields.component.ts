import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { FormElementModel } from 'app/shared/models/form-element.model';
import * as fromFields from 'app/core';
import { RemoveFieldAction } from 'app/core/fields/fields.action';

@Component({
  selector: 'app-form-page-fields',
  templateUrl: './form-page-fields.component.html',
  styleUrls: ['./form-page-fields.component.scss']
})

export class FormPageFieldsComponent implements OnInit, OnDestroy {

  items: FormElementModel[];
  staticItems: FormElementModel[];
  public ngUnsubscribe$ = new Subject<void>();

  constructor(
    private storeFields: Store<fromFields.State>
  ) {}

  ngOnInit(): void {
    if (!this.staticItems) {
      this.storeFields.select(fromFields.getStaticFields).pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(res => {
            const currentArr = this.generateFieldId(res);
            this.items = [...currentArr];
            this.staticItems = [...currentArr];
          }
        );
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.storeFields.dispatch(new RemoveFieldAction(event.previousContainer.data[event.previousIndex]));
    }
  }

  rebuildStaticFields(): void {
    this.items = [...this.generateFieldId(this.staticItems)];
  }

  private generateFieldId(fields: FormElementModel[]): FormElementModel[] {
     return fields.map(({ type, style }) => {
        const id = '_' + Math.random().toString(36).substr(2, 9);
        return { id, type, style };
     });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
    this.ngUnsubscribe$.complete();
  }
}
