import { booleanAttribute, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  SIZE,
  SizeType,
  INPUT_TEXT_VARIANT,
  InputTextVariantType,
  PASSWORD_FIELD_TYPE,
  PasswordFieldType,
} from './password.type';

@Component({
  selector: 'rss-password',
  templateUrl: './password.component.html',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
  host: { class: 'rss-password' },
})
export class PasswordComponent implements ControlValueAccessor {
  @Input() public placeholder = '';
  @Input() public inputId = '';
  @Input() public autocomplete: 'on' | 'off' = 'on';
  @Input() public size: SizeType = SIZE.NORMAL;
  @Input() public variant: InputTextVariantType = INPUT_TEXT_VARIANT.OUTLINED;
  @Input({ transform: booleanAttribute }) public disabled = false;
  @Input({ transform: booleanAttribute }) public toggleMask = false;
  @Input({ transform: booleanAttribute }) public fluid = false;

  public type: PasswordFieldType = PASSWORD_FIELD_TYPE.PASSWORD;

  private _value = '';

  public onTouched!: () => void;
  private _onChange!: (_: unknown) => void;

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    if (value !== this._value) {
      this._value = value;
      this._onChange(value);
    }
  }

  public writeValue(value: string): void {
    this._value = value || '';
  }

  public registerOnChange(function_: (_: unknown) => void): void {
    this._onChange = function_;
  }

  public registerOnTouched(function_: () => void): void {
    this.onTouched = function_;
  }

  public toggleType(): void {
    this.type = this.type === PASSWORD_FIELD_TYPE.PASSWORD ? PASSWORD_FIELD_TYPE.TEXT : PASSWORD_FIELD_TYPE.PASSWORD;
  }
}
