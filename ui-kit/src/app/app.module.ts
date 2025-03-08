/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RippleModule } from 'rss-ui-kit/ripple';
import { ButtonModule } from 'rss-ui-kit/button';
import { InputTextModule } from 'rss-ui-kit/inputtext';
import { InputIconModule } from 'rss-ui-kit/inputicon';
import { IconFieldModule } from 'rss-ui-kit/iconfield';
import { FloatLabelModule } from 'rss-ui-kit/floatlabel';
import { PasswordModule } from 'rss-ui-kit/password';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'rss-ui-kit/message';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    FloatLabelModule,
    PasswordModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
