/* eslint-disable @typescript-eslint/no-extraneous-class */
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PasswordComponent } from './password.component';
import { InputIconModule } from 'rss-ui-kit/inputicon';
import { InputTextModule } from 'rss-ui-kit/inputtext';

@NgModule({
  declarations: [PasswordComponent],
  imports: [FormsModule, InputIconModule, InputTextModule],
  exports: [PasswordComponent],
})
export class PasswordModule {}
