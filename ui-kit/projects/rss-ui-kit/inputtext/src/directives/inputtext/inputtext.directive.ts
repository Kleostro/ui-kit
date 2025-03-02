import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { SIZE, SizeType } from 'rss-ui-kit/shared/types/size';
import { INPUT_TEXT_VARIANT, InputTextVariantType } from '../../inputtext.type';

@Directive({
  selector: '[rssInputText]',
  standalone: false,
})
export class InputTextDirective {
  private _variant: InputTextVariantType = INPUT_TEXT_VARIANT.OUTLINED;
  private _size: SizeType = SIZE.NORMAL;
  private _fluid: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set variant(value: InputTextVariantType) {
    this._variant = value;
    this.renderer.addClass(
      this.el.nativeElement,
      `rss-inputtext-${this._variant}`
    );
  }

  @Input() set size(value: SizeType) {
    this._size = value;
    this.renderer.addClass(
      this.el.nativeElement,
      `rss-inputtext-${this._size}`
    );
  }

  @Input() set fluid(value: boolean) {
    this._fluid = value;
    this.renderer.addClass(
      this.el.nativeElement,
      this._fluid ? 'rss-inputtext-fluid' : ''
    );
  }

  @HostBinding('class.rss-inputtext') isRssInputText = true;
}
