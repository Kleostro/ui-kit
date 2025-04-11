import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TOAST_POSITION, ToastItem, ToastPositionType } from './toast.type';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';

const notFoundIndex = -1;
const defaultTransitionTime = 200;

@Component({
  selector: 'rss-toast',
  templateUrl: './toast.component.html',
  standalone: false,
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() public position: ToastPositionType = TOAST_POSITION.TOP_RIGHT;
  @Input() public showTransformOptions = 'translateX(20%)';
  @Input() public hideTransformOptions = 'translateY(-5%)';
  @Input() public showTransitionTime = defaultTransitionTime;
  @Input() public hideTransitionTime = defaultTransitionTime;

  @Output() public onRemove = new EventEmitter<unknown>();

  private subscription: Subscription = new Subscription();

  public messages: ToastItem[] = [];
  public showTransitionOptions = `${this.showTransitionTime.toString()}ms ease-in`;
  public hideTransitionOptions = `${this.hideTransitionTime.toString()}ms ease-out`;

  constructor(
    private readonly toastService: ToastService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.subscription.add(
      this.toastService.messages$.subscribe((messages) => {
        this.messages = messages;
        for (const message of this.messages) {
          this.startLifeAnimation(message);
        }
      }),
    );
  }

  public remove(message: ToastItem): void {
    const index = this.messages.indexOf(message);

    if (index !== notFoundIndex) {
      this.messages[index].isDying = true;

      setTimeout(() => {
        this.toastService.removeMessage(message);
        this.cdr.detectChanges();
      }, this.hideTransitionTime);
    }
  }

  private startLifeAnimation(message: ToastItem): void {
    if (!message.life || message.life <= 0) {
      return;
    }

    const startTime = Date.now();
    const duration = message.life;

    const animate = (): void => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= duration) {
        this.remove(message);
        return;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
