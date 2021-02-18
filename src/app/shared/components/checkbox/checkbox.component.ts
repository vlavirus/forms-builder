import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() styleArray: any;
  styleExp = {};
  nameCheckbox = '';

  constructor() {}

  ngOnInit(): void {
    if (this.styleArray) {
      this.styleArray.forEach(({ name, value, measurement }) => {
        name === 'name' ? this.nameCheckbox = value : this.styleExp[name] = `${value}${measurement}`;
      });
    }
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.writeValue(value);
  }

  _value: any;

  writeValue(value: number): void {
    this.onChange(this.value);
  }

  private onChange = (value: number) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
