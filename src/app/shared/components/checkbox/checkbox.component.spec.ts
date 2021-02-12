import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('Checkbox component', () => {
  let component;
  let fixture: ComponentFixture<CheckboxComponent>;
  let element: HTMLElement;

  const checkBoxStyle = [
    {
      name: 'name', value: 'test-checkbox-name', measurement: ''
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
  ];
  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CheckboxComponent],
      providers: [
        {
          provide: ControlContainer,
          useValue: formGroupDirective
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.formControlName = 'test';
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get style values', () => {
    component.ngOnInit();
    component.styleArray = [];

    expect(component.styleArray).toEqual([]);
  });


  it('should Checkbox onInit', () => {
    component.styleArray = checkBoxStyle;
    component.ngOnInit();

    expect(component.nameCheckbox).toEqual('test-checkbox-name');
  });


  it('should toggle checkbox template', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.checked).toBeFalsy();
    input.click();
    fixture.detectChanges();
    expect(input.checked).toBeTruthy();
  });

});
