import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})

export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() styleArray: any;
  placeholder = '';
  styleExp = {};
  label = '';
  requiredState = false;

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

  _value: any = '';

  onChange = (value) => {};

  onTouched = () => {};

  ngOnInit(): void {
    if (this.styleArray) {
      this.styleArray.forEach(item => {
        (item.name === 'placeholder') ? this.placeholder = item.value :
          (item.name === 'required') ? this.requiredState = item.value :
            (item.name === 'label') ? this.label = item.value : this.styleExp[item.name] = `${item.value}${item.measurement}`;
      });
    }
  }

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
