import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormElementModel } from '../../shared/models/form-element.model';

@Component({
  selector: 'app-form-page-fields',
  templateUrl: './form-page-fields.component.html',
  styleUrls: ['./form-page-fields.component.scss']
})
export class FormPageFieldsComponent implements OnInit {

  items: FormElementModel[] = [
    { id: '1', type: 'input', style: {} },
    { id: '2', type: 'textarea', style: {} },
    { id: '3', type: 'button', style: {} },
    { id: '4', type: 'checkbox', style: {} },
    { id: '5', type: 'select', style: {} }
  ];

  staticItems: FormElementModel[] = [
    { id: '1', type: 'input', style: {} },
    { id: '2', type: 'textarea', style: {} },
    { id: '3', type: 'button', style: {} },
    { id: '4', type: 'checkbox', style: {} },
    { id: '5', type: 'select', style: {} }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    // debugger
    if (event.previousContainer !== event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.rebuildArray();


    }
  }

  rebuildArray(): void {
    this.items = [...this.staticItems];
  }
}
