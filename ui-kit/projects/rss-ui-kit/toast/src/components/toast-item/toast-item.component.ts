import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToastItem } from '../../toast.type';

@Component({
  selector: 'rss-toastitem',
  templateUrl: './toast-item.component.html',
  standalone: false,
})
export class ToastItemComponent {
  @Input() public message!: ToastItem;
  @Output() private onClose = new EventEmitter<void>();

  @ViewChild('toastMessage') public toastMessage!: ElementRef<HTMLDivElement>;

  public close(): void {
    const message = this.toastMessage.nativeElement;

    message.classList.add('rss-toast-message-hidden');
    message.addEventListener('animationend', () => {
      this.onClose.emit();
    });
  }
}
