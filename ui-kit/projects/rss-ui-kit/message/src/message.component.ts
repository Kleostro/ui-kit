import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import {
  MESSAGE_SEVERITY,
  MESSAGE_SIZE,
  MESSAGE_VARIANT,
  MessageSeverityType,
  MessageSizeType,
  MessageVariantType,
} from './message.type';

@Component({
  selector: 'rss-message',
  templateUrl: './message.component.html',
  host: { class: 'rss-message' },
  standalone: false,
})
export class MessageComponent {
  @Input() public severity: MessageSeverityType = MESSAGE_SEVERITY.INFO;
  @Input() public text: string | null = null;
  @Input() public icon: string | null = null;
  @Input() public variant: MessageVariantType | null = null;
  @Input() public size: MessageSizeType = MESSAGE_SIZE.NORMAL;

  public readonly messageSeverity = MESSAGE_SEVERITY;
  public readonly messageSize = MESSAGE_SIZE;
  public readonly messageVariant = MESSAGE_VARIANT;

  @ContentChild('icon', { static: false }) public iconTemplate?: TemplateRef<unknown>;
}
