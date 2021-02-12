import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})

export class TextareaComponent implements OnInit, ControlValueAccessor {

  @Input() styleArray: any;
  styleExp = {};
  placeholder = '';

  @Input()
  set value(value: any) {
    this._value = value;
    this.writeValue(value);
  }

  get value(): any {
    return this._value;
  }

  constructor() {
  }

  ngOnInit(): void {
    if (this.styleArray) {
      this.styleArray.forEach(({ name, value, measurement }) => {
        name === 'placeholder' ? this.placeholder = value : this.styleExp[name] = `${value}${measurement}`;
      });
    }
  }

  _value: any = '';

  onChange = (value) => {};

  onTouched = () => {};

  writeValue(value): void {
    this.onChange(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
