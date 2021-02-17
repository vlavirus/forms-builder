import { Store, StoreModule } from '@ngrx/store';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { reducers } from 'app/core';
import * as fromFields from 'app/core';
import { GetStaticFieldsSuccess } from 'app/core/fields/fields.action';
import { FormPageFieldsComponent } from './form-page-fields.component';

describe('FormPageFields', () => {
  let component;
  let fixture: ComponentFixture<FormPageFieldsComponent>;
  let element: HTMLElement;
  let store;
  const defaultState = [{ id: '', type: 'input', style: [
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
      declarations: [ FormPageFieldsComponent ],
      providers: [ { provide: Store }]
    }).compileComponents();
  });

  beforeEach(inject([Store], (testStore: Store<fromFields.State>) => {
    store = testStore;
    store.dispatch(new GetStaticFieldsSuccess(defaultState));
    fixture = TestBed.createComponent(FormPageFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add id to static fields', () => {
    component.staticItems = defaultState;
    component.rebuildStaticFields();
    fixture.detectChanges();
    expect(component.items[0].id).toBeTruthy();
  });

  it('should stopped ngUnsubscribe$ after destroyed', () => {
    component.ngOnDestroy();
    expect(component.ngUnsubscribe$.isStopped).toBeTruthy();
  });

  it('should add data to items', () => {
    component.ngOnInit();
    expect(component.items.length).toEqual(1);
    expect(component.staticItems.length).toEqual(1);
  });

  it('should generate new id to item', () => {
    component.ngOnInit();
    const prevId = component.items[0].id;
    component.rebuildStaticFields();
    expect(component.items[0].id).not.toEqual(prevId);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
