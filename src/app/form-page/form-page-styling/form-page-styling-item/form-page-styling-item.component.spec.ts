import { Store, StoreModule } from '@ngrx/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { reducers } from 'app/core';
import * as fromFields from 'app/core';
import { FormPageStylingItemComponent } from './form-page-styling-item.component';
import { By } from '@angular/platform-browser';

describe('FormPageStylingItem', () => {
  let component;
  let fixture: ComponentFixture<FormPageStylingItemComponent>;
  let element: HTMLElement;
  let store;
  const testItem = { id: 'testItem', type: 'input', style: [
      {
        name: 'placeholder', value: 'input', measurement: ''
      },
      {
        name: 'label', value: 'label', measurement: ''
      },
      {
        name: 'width', value: '630', measurement: 'px'
      },
      {
        name: 'height', value: '40', measurement: 'px'
      },
      {
        name: 'required', value: [true, false], measurement: ''
      },
      {
        name: 'border-style', value: [ 'none' , 'hidden' , 'dotted' , 'dashed' , 'solid' , 'double' , 'groove' , 'ridge' , 'inset' , 'outset' ], measurement: ''
      },
      {
        name: 'font-size', value: '16', measurement: 'px'
      },
      {
        name: 'color', value: '#1D9F90', measurement: ''
      }
    ] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        ReactiveComponentModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ FormPageStylingItemComponent ],
      providers: [ { provide: Store }]
    }).compileComponents();
  });

  beforeEach(inject([Store], (testStore: Store<fromFields.State>) => {
    store = testStore;
    fixture = TestBed.createComponent(FormPageStylingItemComponent);
    component = fixture.componentInstance;
    component.currentItem = testItem;
    component.defaultItem = testItem;
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should add controllers to the formGroup', () => {
    expect(component.form.contains('placeholder')).toBeTruthy();
    expect(component.form.contains('label')).toBeTruthy();
    expect(component.form.contains('width')).toBeTruthy();
    expect(component.form.contains('height')).toBeTruthy();
    expect(component.form.contains('required')).toBeTruthy();
    expect(component.form.contains('border-style')).toBeTruthy();
    expect(component.form.contains('font-size')).toBeTruthy();
    expect(component.form.contains('color')).toBeTruthy();
  });

  it('should add new value from template to the form value', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;

    el.value = 'newPlaceholder';
    el.dispatchEvent(new Event('input'));

    expect(component.form.value['placeholder']).toBe('newPlaceholder');
  });

  it('should reset form ', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;

    el.value = 'newPlaceholder';
    el.dispatchEvent(new Event('input'));
    component.onSubmit();

    expect(component.form.value['placeholder']).toBeNull();
  });

  it('should return correct style', () => {
    const objectForSearch = {
      name: 'color', value: '#1D9F90', measurement: ''
    };
    expect(component.findStyle('color', testItem.style)).toEqual(objectForSearch);
  });

});
