import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  Renderer2,
  HostListener,
} from '@angular/core';
import {
  BUTTON_SEVERITY,
  ButtonSeverityType,
  ButtonVariantType,
} from '../../button.types';
import { SIZE, SizeType } from 'rss-ui-kit/shared/types/size';

@Directive({
  selector: '[rssButton]',
  standalone: false,
})
export class ButtonDirective {
  private _severity: ButtonSeverityType = BUTTON_SEVERITY.PRIMARY;
  private _raised: boolean = false;
  private _rounded: boolean = false;
  private _variant?: ButtonVariantType;
  private _size: SizeType = SIZE.NORMAL;
  private _fluid: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set severity(value: ButtonSeverityType) {
    this._severity = value;
    this.renderer.addClass(
      this.el.nativeElement,
      `rss-button-${this._severity}`
    );
  }

  @Input() set raised(value: boolean) {
    this._raised = value;
    this.renderer.addClass(
      this.el.nativeElement,
      this._raised ? 'rss-button-raised' : ''
    );
  }

  @Input() set rounded(value: boolean) {
    this._rounded = value;
    this.renderer.addClass(
      this.el.nativeElement,
      this._rounded ? 'rss-button-rounded' : ''
    );
  }

  @Input() set variant(value: ButtonVariantType) {
    this._variant = value;
    this.renderer.addClass(
      this.el.nativeElement,
      `rss-button-${this._variant}`
    );
  }

  @Input() set size(value: SizeType) {
    this._size = value;
    this.renderer.addClass(this.el.nativeElement, `rss-button-${this._size}`);
  }

  @Input() set fluid(value: boolean) {
    this._fluid = value;
    this.renderer.addClass(
      this.el.nativeElement,
      this._fluid ? 'rss-button-fluid' : ''
    );
  }

  @Output() onClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.rss-button') isRssButton = true;

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
