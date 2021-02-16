import { Store, StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { reducers } from 'app/core';
import * as fromFields from 'app/core';
import { FormPageBuilderComponent } from './form-page-builder.component';
import { GetStaticFieldsSuccess } from 'app/core/fields/fields.action';

describe('FormPageBuilder', () => {
  let component;
  let fixture: ComponentFixture<FormPageBuilderComponent>;
  let element: HTMLElement;
  let store;
  const defaultState = [{ id: 'controlName', type: 'input', style: [
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
        name: 'required', value: true, measurement: ''
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
    ] }];
  const newDefaultState = [{ id: 'newControlName', type: 'input', style: [
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
    ] }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, StoreModule.forRoot(reducers), DragDropModule],
      declarations: [ FormPageBuilderComponent ],
      providers: [ { provide: Store }]
    }).compileComponents();
  });

  beforeEach(inject([Store], (testStore: Store<fromFields.State>) => {
    store = testStore;
    store.dispatch(new GetStaticFieldsSuccess(defaultState));
    fixture = TestBed.createComponent(FormPageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stopped ngUnsubscribe$ after destroyed', () => {
    component.ngOnDestroy();
    expect(component.ngUnsubscribe$.isStopped).toBeTruthy();
  });

  it('should add Controls to the form', () => {
    component.updateControls(defaultState);
    expect(component.form.contains('controlName')).toBeTruthy();
  });

  it('should add new Control to the form and remove old controller', () => {
    component.updateControls(defaultState);
    component.updateControls(newDefaultState);
    expect(component.form.contains('controlName')).toBeFalse();
    expect(component.form.contains('newControlName')).toBeTruthy();
  });

  it('should add validator to exist FormControl', () => {
    component.updateControls(defaultState);
    component.updateControls(newDefaultState);
    expect(component.form.contains('controlName')).toBeFalse();
    expect(component.form.contains('newControlName')).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
