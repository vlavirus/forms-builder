import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as fromFields from 'app/core';
import { getGeneralStyle, reducers } from 'app/core';
import { FormPageStylingComponent } from './form-page-styling.component';
import { AddFieldAction, GetGeneralStyleActionsSuccess, GetStaticFieldsSuccess } from 'app/core/fields/fields.action';

describe('FormPageStyling', () => {
  let component;
  let fixture: ComponentFixture<FormPageStylingComponent>;
  let element: HTMLElement;
  let store;
  const defaultGeneralStyle = [
    {
      name: 'margin-top', value: '0', measurement: 'px'
    },
    {
      name: 'margin-bottom', value: '0', measurement: 'px'
    },
    {
      name: 'margin-right', value: '0', measurement: 'px'
    },
    {
      name: 'margin-left', value: '0', measurement: 'px'
    },
    {
      name: 'padding-top', value: '0', measurement: 'px'
    },
    {
      name: 'padding-bottom', value: '0', measurement: 'px'
    },
    {
      name: 'padding-right', value: '0', measurement: 'px'
    },
    {
      name: 'padding-left', value: '0', measurement: 'px'
    },
    {
      name: 'font-size', value: '16', measurement: 'px'
    }
  ];
  const defaultStaticField = [
    { id: 'testId', type: 'input', style: [
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
      ] } ,
    { id: '', type: 'textarea', style: [
        {
          name: 'placeholder', value: 'Textarea', measurement: ''
        },
        {
          name: 'width', value: '630', measurement: 'px'
        },
        {
          name: 'height', value: '100', measurement: 'px'
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
      ] },
    { id: '', type: 'button', style: [
        {
          name: 'name', value: 'button', measurement: ''
        },
        {
          name: 'width', value: '100', measurement: 'px'
        },
        {
          name: 'height', value: '50', measurement: 'px'
        },
        {
          name: 'border-style', value: [ 'none' , 'hidden' , 'dotted' , 'dashed' , 'solid' , 'double' , 'groove' , 'ridge' , 'inset' , 'outset' ], measurement: ''
        },
        {
          name: 'font-size', value: '16', measurement: 'px'
        }
      ] },
    { id: '', type: 'checkbox', style: [
        {
          name: 'name', value: 'checkbox', measurement: ''
        },
        {
          name: 'width', value: '', measurement: 'px'
        },
        {
          name: 'height', value: '', measurement: 'px'
        },
        {
          name: 'required', value: [true, false], measurement: ''
        }
      ] },
    { id: '', type: 'select', style: [
        {
          name: 'width', value: '120', measurement: 'px'
        },
        {
          name: 'height', value: '50', measurement: 'px'
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
          name: 'font-weight', value: ['bold', 'bolder', 'lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900'], measurement: ''
        },
        {
          name: 'options', value: [], measurement: ''
        }
      ] }
  ];
  const currentItem = { id: 'currentId', type: 'input', style: [
      {
        name: 'placeholder', value: 'asdf', measurement: ''
      },
      {
        name: 'label', value: 'qwer', measurement: ''
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
    ] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
        MatExpansionModule,
        ReactiveComponentModule,
        BrowserAnimationsModule
      ],
      declarations: [ FormPageStylingComponent ],
      providers: [ { provide: Store }]
    }).compileComponents();
  });

  beforeEach(inject([Store], (testStore: Store<fromFields.State>) => {
    store = testStore;
    store.dispatch(new GetGeneralStyleActionsSuccess(defaultGeneralStyle));
    store.dispatch(new GetStaticFieldsSuccess(defaultStaticField));
    store.dispatch(new AddFieldAction({ index: 0, item: defaultStaticField}));
    fixture = TestBed.createComponent(FormPageStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return item with default properties', () => {
    expect(component.findDefaultFormElement(currentItem).id).toBe('testId');
  });

  it('should stopped ngUnsubscribe$ after destroyed', () => {
    component.ngOnDestroy();
    expect(component.ngUnsubscribe$.isStopped).toBeTruthy();
  });

  it('should add value to the form from template', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;
    el.value = 50;
    el.dispatchEvent(new Event('input'));
    expect(component.form.value['margin-top']).toBe('50');
  });

  it('should add value from form to the store by onSubmit', () => {
    let result;
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;
    el.value = 30;
    el.dispatchEvent(new Event('input'));
    component.onSubmit();

    store.select(getGeneralStyle).subscribe(res => {
      result = res;
    });
    expect(result[0].value).toBe('30');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
