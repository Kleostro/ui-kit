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
import { SEVERITY, SeverityType, SIZE, SizeType } from '../button.types';

@Directive({
  selector: '[rssButton]',
})
export class ButtonDirective {
  private _severity: SeverityType = SEVERITY.PRIMARY;
  private _raised: boolean = false;
  private _rounded: boolean = false;
  private _variant: 'text' | 'outlined' | undefined;
  private _size: SizeType = SIZE.NORMAL;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input() set severity(value: SeverityType) {
    this._severity = value;
    this.updateClasses();
  }

  @Input() set raised(value: boolean) {
    this._raised = value;
    this.updateClasses();
  }

  @Input() set rounded(value: boolean) {
    this._rounded = value;
    this.updateClasses();
  }

  @Input() set variant(value: 'text' | 'outlined') {
    this._variant = value;
    this.updateClasses();
  }

  @Input() set size(value: SizeType) {
    this._size = value;
    this.updateClasses();
  }

  @Output() onClick = new EventEmitter<MouseEvent>();

  @HostBinding('class.rss-button') isRssButton = true;

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }

  private updateClasses(): void {
    const classes = [];
    classes.push(`rss-button-${this._size}`);
    classes.push(`rss-button-${this._severity}`);
    classes.push(this._raised ? 'rss-button-raised' : '');
    classes.push(this._rounded ? 'rss-button-rounded' : '');
    classes.push(this._variant ? `rss-button-${this._variant}` : '');

    this.renderer.setAttribute(
      this.el.nativeElement,
      'class',
      classes.join(' ')
    );
  }
}
