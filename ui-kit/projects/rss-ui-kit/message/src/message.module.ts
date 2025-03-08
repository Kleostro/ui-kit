/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@NgModule({
  declarations: [MessageComponent],
  imports: [NgIf, NgTemplateOutlet],
  exports: [MessageComponent],
})
export class MessageModule {}
