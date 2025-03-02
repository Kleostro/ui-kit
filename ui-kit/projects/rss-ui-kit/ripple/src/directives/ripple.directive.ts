import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rssRipple]',
  standalone: false,
})
export class RippleDirective {
  private inkElement: HTMLElement | null = null;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.inkElement) {
      this.createInkElement();
    }

    this.clearRipple();
    this.createRipple(event);
  }

  private createInkElement(): void {
    this.renderer.addClass(this.el.nativeElement, 'rss-ink-container');

    this.inkElement = this.renderer.createElement('span');

    this.renderer.addClass(this.inkElement, 'rss-ink');
    this.renderer.appendChild(this.el.nativeElement, this.inkElement);
  }

  private clearRipple(): void {
    if (
      this.inkElement &&
      this.inkElement.classList.contains('ripple-active')
    ) {
      this.inkElement.classList.remove('ripple-active');
    }
  }

  private createRipple(event: MouseEvent): void {
    if (!this.inkElement) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(this.inkElement, 'width', `${size}px`);
    this.renderer.setStyle(this.inkElement, 'height', `${size}px`);
    this.renderer.setStyle(this.inkElement, 'top', `${y}px`);
    this.renderer.setStyle(this.inkElement, 'left', `${x}px`);

    this.renderer.addClass(this.inkElement, 'ripple-active');
  }
}
