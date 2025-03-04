/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { InputTextDirective } from './directives/inputtext/inputtext.directive';

@NgModule({
  declarations: [InputTextDirective],
  exports: [InputTextDirective],
})
export class InputTextModule {}
