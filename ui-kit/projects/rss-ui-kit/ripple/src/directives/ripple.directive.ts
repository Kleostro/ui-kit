import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rssRipple]',
  standalone: false,
})
export class RippleDirective {
  private inkElement: HTMLElement | null = null;

  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    if (!this.inkElement) {
      this.createInkElement();
    }

    this.clearRipple();
    this.createRipple(event);
  }

  private createInkElement(): void {
    this.renderer.addClass(this.element.nativeElement, 'rss-ink-container');

    this.inkElement = this.renderer.createElement('span') instanceof HTMLSpanElement ? this.inkElement : null;

    this.renderer.addClass(this.inkElement, 'rss-ink');
    this.renderer.appendChild(this.element.nativeElement, this.inkElement);
  }

  private clearRipple(): void {
    if (this.inkElement?.classList.contains('ripple-active')) {
      this.inkElement.classList.remove('ripple-active');
    }
  }

  private createRipple(event: MouseEvent): void {
    if (!this.inkElement) {
      return;
    }

    const rect = this.element.nativeElement.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    this.renderer.setStyle(this.inkElement, 'width', `${size.toString()}px`);
    this.renderer.setStyle(this.inkElement, 'height', `${size.toString()}px`);
    this.renderer.setStyle(this.inkElement, 'top', `${y.toString()}px`);
    this.renderer.setStyle(this.inkElement, 'left', `${x.toString()}px`);

    this.renderer.addClass(this.inkElement, 'ripple-active');
  }
}
