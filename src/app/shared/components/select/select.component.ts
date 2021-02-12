import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { StyleItemModel } from 'app/shared/models/style-item.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})

export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() styleArray!: StyleItemModel[];
  styleExp = {};
  nameButton: string | [] = '';
  dropList: string | [];

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
      // debugger
      this.styleArray.forEach(({name, value, measurement}) => {
        (name === 'options') ? this.dropList = value :
          (name === 'name') ? this.nameButton = value : this.styleExp[name] = `${value}${measurement}`;
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
