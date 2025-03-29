import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  Renderer2,
  HostListener,
  booleanAttribute,
} from '@angular/core';
import { BUTTON_SEVERITY, ButtonSeverityType, ButtonVariantType, SIZE, SizeType } from '../../button.types';

@Directive({
  selector: '[rssButton]',
  standalone: false,
})
export class ButtonDirective {
  private _severity: ButtonSeverityType = BUTTON_SEVERITY.PRIMARY;
  private _raised = false;
  private _rounded = false;
  private _variant?: ButtonVariantType;
  private _size: SizeType = SIZE.NORMAL;
  private _fluid = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  @Input() public set severity(value: ButtonSeverityType) {
    this._severity = value;
    this.renderer.addClass(this.element.nativeElement, `rss-button-${this._severity}`);
  }

  @Input({ transform: booleanAttribute }) public set raised(value: boolean) {
    this._raised = value;
    this.renderer.addClass(this.element.nativeElement, this._raised ? 'rss-button-raised' : '');
  }

  @Input({ transform: booleanAttribute }) public set rounded(value: boolean) {
    this._rounded = value;
    this.renderer.addClass(this.element.nativeElement, this._rounded ? 'rss-button-rounded' : '');
  }

  @Input() public set variant(value: ButtonVariantType) {
    this._variant = value;
    this.renderer.addClass(this.element.nativeElement, `rss-button-${this._variant}`);
  }

  @Input() public set size(value: SizeType) {
    this._size = value;
    this.renderer.addClass(this.element.nativeElement, `rss-button-${this._size}`);
  }

  @Input({ transform: booleanAttribute }) public set fluid(value: boolean) {
    this._fluid = value;
    this.renderer.addClass(this.element.nativeElement, this._fluid ? 'rss-button-fluid' : '');
  }

  @Output() public onClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.rss-button') public isRssButton = true;

  @HostListener('click', ['$event'])
  public handleClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }
}
