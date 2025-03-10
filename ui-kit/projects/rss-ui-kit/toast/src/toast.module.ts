/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastItemComponent } from './components/toast-item/toast-item.component';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [ToastComponent, ToastItemComponent],
  providers: [ToastService],
  exports: [ToastComponent, ToastItemComponent],
})
export class ToastModule {}
