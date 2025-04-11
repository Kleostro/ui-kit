/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { RippleDirective } from './directives/ripple.directive';

@NgModule({
  declarations: [RippleDirective],
  exports: [RippleDirective],
})
export class RippleModule {}
