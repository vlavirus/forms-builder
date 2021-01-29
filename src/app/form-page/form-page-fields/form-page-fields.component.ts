import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-form-page-fields',
  templateUrl: './form-page-fields.component.html',
  styleUrls: ['./form-page-fields.component.scss']
})
export class FormPageFieldsComponent implements OnInit {

  items = [
    'Carrots',
    'Tomatoes',
    'Onions',
    'Apples',
    'Avocados',
    new InputComponent
  ];

  staticItems = [
    'Carrots',
    'Tomatoes',
    'Onions',
    'Apples',
    'Avocados'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
    debugger
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
