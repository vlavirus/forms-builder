import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextareaComponent } from './textarea.component';

describe('Textarea component', () => {
  let component;
  let fixture: ComponentFixture<TextareaComponent>;
  let element: HTMLElement;

  const formGroupDirective = new FormGroupDirective([], []);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TextareaComponent],
      providers: [
        {
          provide: ControlContainer,
          useValue: formGroupDirective
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    component.formControlName = 'test';
    fixture.detectChanges();

    element = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty array', () => {
    component.ngOnInit();
    component.styleArray = [];

    expect(component.styleArray).toEqual([]);
  });

  it('should add value to textarea', () => {
    const textarea = fixture.debugElement.query(By.css('textarea'));
    const el = textarea.nativeElement;

    el.value = 'someValue';
    el.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.value).toBe('someValue');
  });
});
