import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() public label?: string;
  @Input() public severity: ButtonSeverityType = BUTTON_SEVERITY.PRIMARY;
  @Input() public raised = false;
  @Input() public rounded = false;
  @Input() public variant?: ButtonVariantType;
  @Input() public size: SizeType = SIZE.NORMAL;
  @Input() public fluid = false;
  @Input() public type: ButtonTypeType = BUTTON_TYPE.BUTTON;
  @Input() public disabled = false;
  @Input() public icon?: string;
  @Input() public iconPosition: ButtonIconPositionType = BUTTON_ICON_POSITION.LEFT;
  @Input() public loading = false;
  @Input() public loadingIcon?: string;

  @Output() public onClick = new EventEmitter<MouseEvent>();

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
