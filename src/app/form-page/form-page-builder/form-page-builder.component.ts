import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddFieldAction, GetStaticFieldsActions } from '../../core/fields/fields.action';
import { Store } from '@ngrx/store';
import * as fromFields from '../../core';

@Component({
  selector: 'app-form-page-builder',
  templateUrl: './form-page-builder.component.html',
  styleUrls: ['./form-page-builder.component.scss']
})
export class FormPageBuilderComponent implements OnInit {

  form = [];

  constructor(
    private storeFields: Store<fromFields.State>
  ) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    debugger
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // transferArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
      this.storeFields.dispatch(new AddFieldAction(event.previousContainer.data[event.previousIndex]));
    }
  }

}

// this.storeFields.dispatch(new AddFieldAction(event.previousContainer.data[event.previousIndex]));
