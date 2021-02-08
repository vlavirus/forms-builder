import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})


export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() styleArray: any;
  styleExp = {};
  nameButton = '';
  dropList;

  @Input()
  set value(value: any) {
    // debugger
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
    // debugger
    if (this.styleArray) {
      this.styleArray.forEach(item => {
        // debugger
        (item.name === 'options') ? this.dropList = item.value :
        item.name === 'name' ? this.nameButton = item.value : this.styleExp[item.name] = `${item.value}${item.measurement}`;
      });
    }
  }

  writeValue(value): void {
    // debugger
    this.onChange(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
