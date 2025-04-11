/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { JsonPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { RippleModule } from 'rss-ui-kit/ripple';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [NgIf, NgTemplateOutlet, RippleModule, RouterModule, JsonPipe],
  exports: [MenuComponent, MenuItemComponent],
})
export class MenuModule {}
