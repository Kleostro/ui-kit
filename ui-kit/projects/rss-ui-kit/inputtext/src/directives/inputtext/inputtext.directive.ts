import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

import { INPUT_TEXT_VARIANT, InputTextVariantType, SIZE, SizeType } from '../../inputtext.type';

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
    if (this._fluid) {
      this.renderer.addClass(this.element.nativeElement, 'rss-inputtext-fluid');
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'rss-inputtext-fluid');
    }
  }

  @HostBinding('class.rss-inputtext') public isRssInputText = true;

  @HostListener('change', ['$event'])
  public onChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value === '') {
        this.renderer.removeClass(this.element.nativeElement, 'rss-filled');
      } else {
        this.renderer.addClass(this.element.nativeElement, 'rss-filled');
      }
    }
  }
}
