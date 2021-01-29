import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  @Input()
  set value(value: any) {
    this._value = value;
    this.writeValue(this._value);
  }

  get value(): any {
    return this._value;
  }

  _value: string;

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: string): void {
    this._value = value;
    this.onChange(this._value);
  }

  onChange(value: string): void {}

}
