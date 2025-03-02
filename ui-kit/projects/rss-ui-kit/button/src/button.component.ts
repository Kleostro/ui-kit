import {
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import {
  ICON_POSITION,
  IconPositionType,
  SEVERITY,
  SeverityType,
  SIZE,
  SizeType,
} from './button.types';

@Component({
  selector: 'rss-button',
  templateUrl: './button.component.html',
  standalone: false,
})
export class ButtonComponent {
  public label = input<string>();
  public severity = input<SeverityType>(SEVERITY.PRIMARY);
  public raised = input<boolean>();
  public rounded = input<boolean>();
  public variant = input<'text' | 'outlined'>();
  public size = input<SizeType>(SIZE.NORMAL);
  public disabled = input<boolean>();
  public icon = input<string>();
  public iconPosition = input<IconPositionType>(ICON_POSITION.LEFT);

  @Output() onClick = new EventEmitter<MouseEvent>();

  handleIcon(): string {
    return this.icon()?.split(' ').join(' ') ?? '';
  }

  getClasses(): string {
    const classes = [];

    classes.push(`rss-button-${this.size()}`);
    classes.push(`rss-button-${this.severity()}`);
    classes.push(this.raised() ? 'rss-button-raised' : '');
    classes.push(this.rounded() ? 'rss-button-rounded' : '');
    classes.push(this.variant() ? `rss-button-${this.variant()}` : '');

    if (
      this.iconPosition() === ICON_POSITION.TOP ||
      this.iconPosition() === ICON_POSITION.BOTTOM
    ) {
      classes.push('rss-button-vertical');
    }

    if (this.icon() && !this.label()) {
      classes.push('rss-button-icon-only');
    }

    return classes.join(' ');
  }

  handleIconPosition(): string {
    switch (this.iconPosition()) {
      case ICON_POSITION.RIGHT: {
        return 'rss-button-icon-right';
      }
      case ICON_POSITION.TOP: {
        return 'rss-button-icon-top';
      }
      case ICON_POSITION.BOTTOM: {
        return 'rss-button-icon-bottom';
      }
      default: {
        return '';
      }
    }
  }
}
