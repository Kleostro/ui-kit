import { Component, Input } from '@angular/core';
import { FLOAT_LABEL_VARIANT, FloatLabelVariantType } from './floatlabel.type';

@Component({
  selector: 'rss-floatlabel',
  templateUrl: './floatlabel.component.html',
  standalone: false,
  host: {
    class: 'rss-floatlabel',
    '[class]': 'getDynamicClasses()',
  },
})
export class FloatLabelComponent {
  @Input() public variant: FloatLabelVariantType = FLOAT_LABEL_VARIANT.OVER;

  public getDynamicClasses(): Record<string, boolean> {
    return {
      'rss-floatlabel-in': this.variant === FLOAT_LABEL_VARIANT.IN,
      'rss-floatlabel-on': this.variant === FLOAT_LABEL_VARIANT.ON,
      'rss-floatlabel-over': this.variant === FLOAT_LABEL_VARIANT.OVER,
    };
  }
}
