import { FormsModule } from '@angular/forms';
/* eslint-disable @typescript-eslint/no-extraneous-class */
import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { InputTextModule } from 'rss-ui-kit/inputtext';
import { DatepickerCalendarComponent } from './components/datepicker-calendar/datepicker-calendar.component';
import { JsonPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ButtonModule } from 'rss-ui-kit/button';
import { DatepickerService } from './services/datepicker/datepicker.service';
import { RippleModule } from 'rss-ui-kit/ripple';

@NgModule({
  declarations: [DatepickerComponent, DatepickerCalendarComponent],
  providers: [DatepickerService],
  imports: [FormsModule, InputTextModule, NgFor, NgIf, ButtonModule, JsonPipe, NgClass, NgStyle, RippleModule],
  exports: [DatepickerComponent, DatepickerCalendarComponent],
})
export class DatePickerModule {}
