import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TOAST_POSITION, ToastItem, ToastPositionType } from './toast.type';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';

@Component({
  selector: 'rss-toast',
  templateUrl: './toast.component.html',
  standalone: false,
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() public position: ToastPositionType = TOAST_POSITION.TOP_RIGHT;
  @Output() public onRemove = new EventEmitter<unknown>();

  public messages: ToastItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private readonly toastService: ToastService) {}

  public ngOnInit(): void {
    this.subscription.add(this.toastService.messages$.subscribe((messages) => (this.messages = messages)));
  }

  public remove(message: ToastItem): void {
    this.toastService.removeMessage(message);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
