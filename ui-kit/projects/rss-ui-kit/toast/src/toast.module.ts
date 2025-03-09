/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastItemComponent } from './components/toast-item/toast-item.component';
import { ToastService } from './toast.service';
import { ButtonModule } from 'rss-ui-kit/button';
import { RippleModule } from 'rss-ui-kit/ripple';

@NgModule({
  declarations: [ToastComponent, ToastItemComponent],
  providers: [ToastService],
  imports: [ButtonModule, RippleModule],
  exports: [ToastComponent, ToastItemComponent],
})
export class ToastModule {}
