import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastItem } from '../../toast.type';
import { animate, state, style, transition, trigger } from '@angular/animations';

const showAnimation = transition('void => *', [
  style({
    opacity: 0,
    transform: '{{showTransformParams}}',
  }),
  animate('{{showTransitionParams}}'),
]);

const hideAnimation = transition('* => void', [
  animate(
    '{{hideTransitionParams}}',
    style({
      opacity: 0,
      height: 0,
      transform: '{{hideTransformParams}}',
    }),
  ),
]);

@Component({
  selector: 'rss-toastitem',
  templateUrl: './toast-item.component.html',
  standalone: false,
  host: { style: 'display: contents' },
  animations: [
    trigger('messageState', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      showAnimation,
      hideAnimation,
    ]),
  ],
})
export class ToastItemComponent {
  @Input() public message!: ToastItem;
  @Input() public showTransformOptions?: string;
  @Input() public hideTransformOptions?: string;
  @Input() public showTransitionOptions?: string;
  @Input() public hideTransitionOptions?: string;

  @Output() private onClose = new EventEmitter<void>();

  public isDying = false;

  public close(): void {
    this.isDying = true;
    this.onClose.emit();
  }
}
