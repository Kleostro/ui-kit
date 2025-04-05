/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';

import { DrawerComponent } from './drawer.component';
import { ButtonModule } from 'rss-ui-kit/button';
import { RippleModule } from 'rss-ui-kit/ripple';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@NgModule({
  declarations: [DrawerComponent],
  imports: [ButtonModule, RippleModule, NgIf, NgTemplateOutlet],
  exports: [DrawerComponent],
})
export class DrawerModule {}
