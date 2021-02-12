import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { By } from '@angular/platform-browser';

describe('Input component', () => {
  let component;
  let fixture: ComponentFixture<InputComponent>;
  let element: HTMLElement;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputComponent],
      providers: [
        {
          provide: ControlContainer,
          useValue: formGroupDirective
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.formControlName = 'test';
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check input style values', () => {
    component.ngOnInit();
    component.styleArray = [];

    expect(component.styleArray).toEqual([]);
  });

  it('should add value to template', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const el = input.nativeElement;

    el.value = 'someValue';
    el.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.value).toBe('someValue');
  });
});
