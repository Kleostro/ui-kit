import { booleanAttribute, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  BUTTON_ICON_POSITION,
  ButtonIconPositionType,
  BUTTON_SEVERITY,
  ButtonSeverityType,
  ButtonVariantType,
  SizeType,
  SIZE,
  BUTTON_TYPE,
  ButtonTypeType,
} from './button.types';

@Component({
  selector: 'rss-button',
  templateUrl: './button.component.html',
  standalone: false,
})
export class ButtonComponent {
  @Input() public label?: string | number;
  @Input() public icon?: string;
  @Input() public loadingIcon?: string;
  @Input() public variant?: ButtonVariantType;
  @Input() public size: SizeType = SIZE.NORMAL;
  @Input() public severity: ButtonSeverityType = BUTTON_SEVERITY.PRIMARY;
  @Input() public iconPosition: ButtonIconPositionType = BUTTON_ICON_POSITION.LEFT;
  @Input() public type: ButtonTypeType = BUTTON_TYPE.BUTTON;
  @Input({ transform: booleanAttribute }) public raised = false;
  @Input({ transform: booleanAttribute }) public rounded = false;
  @Input({ transform: booleanAttribute }) public fluid = false;
  @Input({ transform: booleanAttribute }) public disabled = false;
  @Input({ transform: booleanAttribute }) public loading = false;

  @Output() public onClick = new EventEmitter<MouseEvent>();

  @ViewChild('button') public elementReference!: ElementRef<HTMLButtonElement>;

  public focus(): void {
    this.elementReference.nativeElement.focus();
  }

  public getClasses(): string {
    const classes = [];

    classes.push(
      `rss-button-${this.size}`,
      `rss-button-${this.severity}`,
      this.raised ? 'rss-button-raised' : '',
      this.rounded ? 'rss-button-rounded' : '',
      this.variant ? `rss-button-${this.variant}` : '',
      this.fluid ? 'rss-button-fluid' : '',
    );

    if (this.iconPosition === BUTTON_ICON_POSITION.TOP || this.iconPosition === BUTTON_ICON_POSITION.BOTTOM) {
      classes.push('rss-button-vertical');
    }

    if (this.icon && !this.label) {
      classes.push('rss-button-icon-only');
    }

    return classes.join(' ');
  }

  public handleIconPosition(): string {
    switch (this.iconPosition) {
      case BUTTON_ICON_POSITION.RIGHT: {
        return 'rss-button-icon-right';
      }
      case BUTTON_ICON_POSITION.TOP: {
        return 'rss-button-icon-top';
      }
      case BUTTON_ICON_POSITION.BOTTOM: {
        return 'rss-button-icon-bottom';
      }
      default: {
        return '';
      }
    }
  }
}
