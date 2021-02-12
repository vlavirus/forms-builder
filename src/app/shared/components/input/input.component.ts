import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { StyleItemModel } from 'app/shared/models/style-item.model';

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

  @Input() styleArray!: StyleItemModel[];
  placeholder: string | [];
  styleExp = {};
  label: string | [];

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
      this.styleArray.forEach(({ name, value, measurement }) => {
        switch (name) {
          case 'placeholder' :
            this.placeholder = value;
            break;
          case 'label' :
            this.label = value;
            break;
          default:
            this.styleExp[name] = `${value}${measurement}`;
            break;
        }
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
