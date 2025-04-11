import {
  booleanAttribute,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MenuItem, MenuItemCallbackEvent } from '../../menu.types';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';

const showAnimation = transition(':enter', [
  style({ opacity: 0, transform: 'scaleY(0.8)' }),
  animate('{{showTransitionParams}}'),
]);
const hideAnimation = transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]);

@Component({
  selector: 'rss-menu',
  templateUrl: './menu.component.html',
  standalone: false,
  animations: [trigger('overlayAnimation', [showAnimation, hideAnimation])],
})
export class MenuComponent {
  @Input() public model: MenuItem[] = [];
  @Input() public showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() public hideTransitionOptions = '.1s linear';
  @Input({ transform: booleanAttribute }) public popup = false;

  @ContentChild('start', { descendants: false }) public startTemplate: TemplateRef<unknown> | null = null;
  @ContentChild('end', { descendants: false }) public endTemplate: TemplateRef<unknown> | null = null;
  @ContentChild('item', { descendants: false }) public itemTemplate: TemplateRef<unknown> | null = null;

  @ViewChild('container') public containerViewChild: ElementRef<HTMLDivElement> | null = null;

  @Output() public onShow: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() public onHide: EventEmitter<unknown> = new EventEmitter<unknown>();

  public container: HTMLDivElement | null = null;
  public visible = false;

  private triggerElement: HTMLElement | null = null;

  public onMenuItemClick(data: MenuItemCallbackEvent): void {
    const { originalEvent, item } = data;
    if (item?.disabled) {
      originalEvent?.preventDefault();
      return;
    }

    if (item && !item.url && !item.routerLink) {
      originalEvent?.preventDefault();
    }

    if (item?.callback) {
      item.callback({
        originalEvent,
        item: item,
      });
    }

    if (this.popup) {
      this.hide();
    }
  }

  public toggle(event: MouseEvent): void {
    if (event.target instanceof HTMLElement) {
      this.triggerElement = event.target;
    }

    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public show(): void {
    this.visible = true;
  }

  public hide(): void {
    this.visible = false;
  }

  public onOverlayAnimationStart(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible': {
        if (this.popup && event.element instanceof HTMLDivElement) {
          this.container = event.element;
          this.onShow.emit({});
        }
        break;
      }

      case 'void': {
        this.onHide.emit({});
        break;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (
      (event.target instanceof HTMLElement && this.containerViewChild?.nativeElement.contains(event.target)) ||
      this.triggerElement === event.target
    ) {
      return;
    }

    this.hide();
  }
}
