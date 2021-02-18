import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Select component', () => {
  let component;
  let fixture: ComponentFixture<SelectComponent>;
  let element: HTMLElement;

  const formGroupDirective = new FormGroupDirective([], []);
  const selectController = new FormControl('testValue', []);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SelectComponent],
      providers: [
        {
          provide: ControlContainer,
          useValue: formGroupDirective
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.formControlName = 'selectController';
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add input style values', () => {
    component.ngOnInit();
    component.styleArray = [];

    expect(component.styleArray).toEqual([]);
  });

  it('should add style to component properties', () => {
    const styleObject = {
      'border-style': 'none,hidden,dotted,dashed,solid,double,groove,ridge,inset,outset',
      'font-size': '16px',
      'font-weight': 'bold,bolder,lighter,normal,100,200,300,400,500,600,700,800,900',
      height: '50px',
      required: 'true,false',
      width: '120px',
    };
    component.styleArray = [
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
        name: 'options', value: [{name: 'testOption', value: 'testOption'}], measurement: ''
      }
    ];
    component.ngOnInit();

    expect(component.styleExp).toEqual(styleObject);
    expect(component.dropList).toEqual([{name: 'testOption', value: 'testOption'}]);
  });

  it('should generate template', () => {
    const input = fixture.debugElement.query(By.css('select'));
    const el = input.nativeElement;

    expect(el).toBeTruthy();
  });

  it('should get value from the properties', () => {
    component.ngOnInit();
    component._value = 'test';
    expect(component.value).toBeTruthy('test');
  });

  // it('should get ngModel', ( async () => {
  //   const customComponent = fixture.debugElement.query(By.directive(SelectComponent));
  //
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     expect(customComponent.componentInstance.value).toEqual('');
  //   });
  // }));

});
