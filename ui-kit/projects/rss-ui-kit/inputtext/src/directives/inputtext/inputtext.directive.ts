import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

import { INPUT_TEXT_VARIANT, InputTextVariantType } from '../../inputtext.type';
import { SIZE, SizeType } from '../../inputtext.types';

@Directive({
  selector: '[rssInputText]',
  standalone: false,
})
export class InputTextDirective {
  private _variant: InputTextVariantType = INPUT_TEXT_VARIANT.OUTLINED;
  private _size: SizeType = SIZE.NORMAL;
  private _fluid = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  @Input() public set variant(value: InputTextVariantType) {
    this._variant = value;
    this.renderer.addClass(this.element.nativeElement, `rss-inputtext-${this._variant}`);
  }

  @Input() public set size(value: SizeType) {
    this._size = value;
    this.renderer.addClass(this.element.nativeElement, `rss-inputtext-${this._size}`);
  }

  @Input() public set fluid(value: boolean) {
    this._fluid = value;
    this.renderer.addClass(this.element.nativeElement, this._fluid ? 'rss-inputtext-fluid' : '');
  }

  @HostBinding('class.rss-inputtext') public isRssInputText = true;
}
