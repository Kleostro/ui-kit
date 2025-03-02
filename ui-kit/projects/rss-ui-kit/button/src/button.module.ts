/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { RippleModule } from 'rss-ui-kit/ripple';
import { ButtonDirective } from './directives/button.directive';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, RippleModule, ButtonDirective],
  exports: [ButtonComponent, ButtonDirective],
})
export class ButtonModule {}
