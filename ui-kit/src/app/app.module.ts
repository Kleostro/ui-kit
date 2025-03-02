/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RippleModule } from 'rss-ui-kit/ripple';
import { ButtonModule } from 'rss-ui-kit/button';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ButtonModule, RippleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
