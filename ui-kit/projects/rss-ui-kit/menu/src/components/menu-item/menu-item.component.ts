import { Component, EventEmitter, forwardRef, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MenuItem, MenuItemCallbackEvent } from '../../menu.types';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: '[rssMenuItemContent]',
  templateUrl: './menu-item.component.html',
  standalone: false,
})
export class MenuItemComponent implements OnInit {
  @Input('rssMenuItemContent') public item: MenuItem | null = null;
  @Output() public onMenuItemClick: EventEmitter<MenuItemCallbackEvent> = new EventEmitter<MenuItemCallbackEvent>();
  @Input() public itemTemplate: TemplateRef<unknown> | null = null;
  public menu: MenuComponent;

  constructor(@Inject(forwardRef(() => MenuComponent)) menu: MenuComponent) {
    this.menu = menu;
  }

  public ngOnInit(): void {
    console.log(this.itemTemplate);
  }

  public onItemClick(event: MouseEvent, item: MenuItem | null): void {
    const data: MenuItemCallbackEvent = { originalEvent: event, item };
    this.onMenuItemClick.emit(data);
  }
}
