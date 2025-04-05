import { animate, animation, AnimationEvent, style, transition, trigger, useAnimation } from '@angular/animations';
import {
  booleanAttribute,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DRAWER_POSITION, DrawerPositionType } from './drawer.type';
import { ButtonComponent } from 'rss-ui-kit/button';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);
const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);

@Component({
  selector: 'rss-drawer',
  templateUrl: './drawer.component.html',
  standalone: false,
  animations: [
    trigger('panelState', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
})
export class DrawerComponent {
  @Input() public title = '';
  @Input({ transform: booleanAttribute }) public showCloseButton = false;
  @Input({ transform: booleanAttribute }) public stopScrolling = false;
  @Input() public transitionOptions = '300ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() public transformOptions = 'translate3d(-100%, 0px, 0px)';

  @ViewChild('closeButton') public closeButtonViewChild?: ButtonComponent;
  @ViewChild('container') public containerViewChild!: ElementRef<HTMLDivElement>;
  @ContentChild('header', { static: false }) public headerTemplate?: TemplateRef<unknown>;
  @ContentChild('body', { static: false }) public bodyTemplate?: TemplateRef<unknown>;
  @ContentChild('footer', { static: false }) public footerTemplate?: TemplateRef<unknown>;
  @ContentChild('headless', { static: false }) public headlessTemplate?: TemplateRef<unknown>;

  public renderer: Renderer2 = inject(Renderer2);

  public container!: HTMLDivElement;

  private _visible = false;
  private _position: DrawerPositionType = DRAWER_POSITION.LEFT;

  @Input() public get visible(): boolean {
    return this._visible;
  }

  public set visible(value: boolean) {
    this._visible = value;
  }

  @Input() public get position(): DrawerPositionType {
    return this._position;
  }

  public set position(value: DrawerPositionType) {
    this._position = value;
    switch (value) {
      case DRAWER_POSITION.LEFT: {
        this.transformOptions = 'translate3d(-100%, 0px, 0px)';
        break;
      }
      case DRAWER_POSITION.RIGHT: {
        this.transformOptions = 'translate3d(100%, 0px, 0px)';
        break;
      }
      case DRAWER_POSITION.BOTTOM: {
        this.transformOptions = 'translate3d(0px, 100%, 0px)';
        break;
      }
      case DRAWER_POSITION.TOP: {
        this.transformOptions = 'translate3d(0px, -100%, 0px)';
        break;
      }
      case DRAWER_POSITION.FULL: {
        this.transformOptions = 'none';
        break;
      }
    }
  }

  @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onShow: EventEmitter<object> = new EventEmitter<object>();
  @Output() public onHide: EventEmitter<object> = new EventEmitter<object>();

  public show(): void {
    if (this.stopScrolling) {
      this.renderer.addClass(globalThis.document.body, 'rss-stop-scrolling');
    }
    this.onShow.emit({});
    this.visibleChange.emit(true);

    this.closeButtonViewChild?.focus();
  }

  public hide(emit = true): void {
    if (this.stopScrolling) {
      this.renderer.removeClass(globalThis.document.body, 'rss-stop-scrolling');
    }
    if (emit) {
      this.onHide.emit({});
    }
  }

  public close(event: MouseEvent): void {
    if (event.target === this.containerViewChild.nativeElement) {
      return;
    }

    this.hide();
    this.visibleChange.emit(false);
    event.preventDefault();
  }

  public onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'visible' && event.element instanceof HTMLDivElement) {
      const { parentElement } = event.element;
      if (parentElement && parentElement instanceof HTMLDivElement) {
        this.container = parentElement;
      }
      if (!globalThis.document.body.contains(this.container)) {
        this.renderer.appendChild(globalThis.document.body, this.container);
      }
      this.show();
    }
  }

  public onAnimationEnd(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.hide(false);
    }
  }
}
