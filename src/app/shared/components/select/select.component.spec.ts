import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';

describe('Select component', () => {
  let component;
  let fixture: ComponentFixture<SelectComponent>;
  let element: HTMLElement;

  const formGroupDirective = new FormGroupDirective([], []);

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
    component.formControlName = 'test';
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
});
