import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RippleModule } from 'rss-ui-kit/ripple';
import { ButtonModule } from 'rss-ui-kit/button';
import { InputTextModule } from 'rss-ui-kit/inputtext';
import { InputIconModule } from 'rss-ui-kit/inputicon';
import { IconFieldModule } from 'rss-ui-kit/iconfield';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
