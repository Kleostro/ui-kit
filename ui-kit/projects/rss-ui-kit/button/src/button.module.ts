/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { RippleModule } from 'rss-ui-kit/ripple';
import { ButtonDirective } from './directives/button/button.directive';

@NgModule({
  declarations: [ButtonComponent, ButtonDirective],
  imports: [RippleModule],
  exports: [ButtonComponent, ButtonDirective],
})
export class ButtonModule {}
