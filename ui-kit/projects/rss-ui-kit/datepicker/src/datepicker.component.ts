import { pad } from './utilties';
/* eslint-disable no-magic-numbers */
import {
  AfterViewInit,
  booleanAttribute,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  numberAttribute,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerService } from './services/datepicker/datepicker.service';
import { overlayAnimation } from './animations';
import { formatDateToString, formatTimeToAmPm, parseDate } from './utilties';
import {
  CalendarState,
  initialCalendarState,
  SELECTION_MODE,
  SelectionModeType,
  SIZE,
  SizeType,
  TIME_PERIOD,
  VARIANT,
  VariantType,
  VIEW,
  ViewType,
} from './datepicker.type';

const DEFAULT_DATE_FORMAT = 'dd-mm-yyyy';
const DEFAULT_MULTIPLE_SEPARATOR = ',';
const DEFAULT_RANGE_SEPARATOR = '-';

@Component({
  selector: 'rss-datepicker',
  templateUrl: './datepicker.component.html',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
  animations: [overlayAnimation],
})
export class DatepickerComponent implements ControlValueAccessor, AfterViewInit {
  public maxDate = input<Date | null>(null);
  public minDate = input<Date | null>(null);
  public showButtonBar = input(false, { transform: booleanAttribute });
  public autoClose = input(false, { transform: booleanAttribute });
  public highlightWeekend = input(true, { transform: booleanAttribute });
  public showTime = input(false, { transform: booleanAttribute });
  public displayedMonthsCount = input(1, { transform: numberAttribute });
  public maxMultipleDateCount = input(null, { transform: numberAttribute });
  public firstDayOfWeek = input(0, { transform: numberAttribute });
  public hourFormat = input('24');
  public view = input<ViewType>(VIEW.DATE);
  public selectionMode = input<SelectionModeType>(SELECTION_MODE.SINGLE);
  public multipleSeparator = input<string>(DEFAULT_MULTIPLE_SEPARATOR);
  public rangeSeparator = input<string>(DEFAULT_RANGE_SEPARATOR);
  public dateFormat = input<string>(DEFAULT_DATE_FORMAT);
  public calendarState = signal<CalendarState>(initialCalendarState);

  public disabled = input(false, { transform: booleanAttribute });
  public class = input<string>('');
  public variant = input<VariantType>(VARIANT.OUTLINED);
  public size = input<SizeType>(SIZE.NORMAL);
  public inputId = input<string>('');
  public name = input<string>('');
  public placeholder = input<string>('');
  public displayIcon = input<string>('');
  public showTransitionOptions = input<string>('120ms cubic-bezier(0, 0, 0.2, 1)');
  public hideTransitionOptions = input<string>('100ms linear');

  @ViewChild('datepickerElement', { static: false }) public datepickerElement!: ElementRef<HTMLDivElement>;
  @ViewChild('inputElement', { static: false })
  public inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('datepickerPanel', { static: false }) public datepickerPanel!: ElementRef<HTMLDivElement>;

  public datepickerService = inject(DatepickerService);

  public isCalendarOpen = signal<boolean>(false);

  private _value: Date | (Date | null)[] | null = null;
  public _onChange!: (_: unknown) => void;
  public _onTouched!: () => void;

  public ngAfterViewInit(): void {
    this.initializeCalendarState();
  }

  public get value(): Date | (Date | null)[] | null {
    return this._value;
  }

  public set value(value: Date | (Date | null)[] | null) {
    if (value !== this._value) {
      this._value = value;
      this._onChange(value);
    }
  }

  public writeValue(value: Date | (Date | null)[] | null): void {
    this._value = value;
  }

  public registerOnChange(function_: (_: unknown) => void): void {
    this._onChange = function_;
  }

  public registerOnTouched(function_: () => void): void {
    this._onTouched = function_;
  }

  public handleDateSelection(date: Date | null): void {
    switch (this.calendarState().selectionMode) {
      case SELECTION_MODE.SINGLE: {
        this.setInputValueForMode(SELECTION_MODE.SINGLE, date ? formatDateToString(date, this.dateFormat()) : '', '');
        break;
      }
      case SELECTION_MODE.MULTIPLE: {
        this.setInputValueForMode(
          SELECTION_MODE.MULTIPLE,
          this.formatDatesToString(this.calendarState().selectedDates, this.multipleSeparator()),
          this.multipleSeparator(),
        );
        break;
      }
      case SELECTION_MODE.RANGE: {
        this.setInputValueForMode(
          SELECTION_MODE.RANGE,
          this.formatDatesToString(this.calendarState().selectedDates, this.rangeSeparator()),
          this.rangeSeparator(),
        );
        break;
      }
    }
  }

  private setInputValueForSingleMode(value: string): void {
    const parsedDate = parseDate(value.split(' ')[0].trim(), this.calendarState());

    if (parsedDate) {
      const state = this.calendarState();
      state.selectedDates = [parsedDate];
      this.updateCalendarStateWithLastDate(state.selectedDates);
      this.closeCalendar();
    }
  }

  private setInputValueForMultipleMode(value: string): void {
    const state = this.calendarState();
    state.selectedDates = value
      .split(this.multipleSeparator())
      .map((date) => parseDate(date.trim(), this.calendarState()));
    this.value = state.selectedDates;
    this.updateInputValue(this.formatDatesToString(state.selectedDates, this.multipleSeparator()));
    this.updateCalendarStateWithLastDate(state.selectedDates);
    this.closeCalendar();
  }

  private setInputValueForRangeMode(value: string): void {
    const state = this.calendarState();
    const [startDate, endDate] = value
      .split(` ${state.rangeSeparator} `)
      .map((date) => parseDate(date.trim(), this.calendarState()));

    if (startDate && endDate) {
      const [sortStartDate, sortEndDate] = this.datepickerService.sortDateRange(startDate, endDate, state);
      this.value = [sortStartDate, sortEndDate];
      this.updateInputValue(this.formatDatesToString(state.selectedDates, this.rangeSeparator()));
      this.updateCalendarStateWithLastDate(state.selectedDates);
      this.closeCalendar();
    }
  }

  private updateCalendarStateWithLastDate(dates: (Date | null)[]): void {
    const lastSelectedDate = dates.at(-1);
    if (lastSelectedDate) {
      const state = this.calendarState();
      state.currentYear = lastSelectedDate.getFullYear();
      state.currentMonth = lastSelectedDate.getMonth();
    }
  }

  private setInputValueForMode(mode: SelectionModeType, value: string, separator: string): void {
    let parsedDates: (Date | null)[] = [];

    switch (mode) {
      case SELECTION_MODE.SINGLE: {
        parsedDates = this.parseSingleDate(value);

        break;
      }
      case SELECTION_MODE.MULTIPLE: {
        parsedDates = this.parseMultipleDates(value, separator);

        break;
      }
      case SELECTION_MODE.RANGE: {
        parsedDates = this.parseRangeDates(value, separator);

        break;
      }
    }

    this.handleParsedDates(parsedDates, separator);
  }

  private parseSingleDate(value: string): (Date | null)[] {
    const parsedDate = parseDate(value, this.calendarState());
    return parsedDate ? [parsedDate] : [];
  }

  private parseMultipleDates(value: string, separator: string): (Date | null)[] {
    return value
      .split(separator)
      .filter(Boolean)
      .map((date) => parseDate(date.trim(), this.calendarState()));
  }

  private parseRangeDates(value: string, separator: string): (Date | null)[] {
    const [startDate, endDate] = value
      .split(` ${separator} `)
      .map((date) => parseDate(date.trim(), this.calendarState()));

    if (startDate && endDate) {
      return this.datepickerService.sortDateRange(startDate, endDate, this.calendarState());
    }
    return startDate ? [startDate] : [];
  }

  private handleParsedDates(parsedDates: (Date | null)[], separator: string): void {
    const state = this.calendarState();
    if (parsedDates.length > 0) {
      state.selectedDates = parsedDates;
      this.value = parsedDates;
      const formattedValue = this.formatInputValue(parsedDates, separator);
      this.updateInputValue(formattedValue);
      this.updateCalendarStateWithLastDate(parsedDates);
      this.autoFocusOnInput(formattedValue);
      this.closeCalendar();
    } else {
      this.value = null;
      this.updateInputValue('');
    }
  }

  private formatInputValue(dates: (Date | null)[], separator: string): string {
    const formattedValue = this.formatDatesToString(dates, separator);
    if (this.showTime()) {
      const { selectedHour, selectedMinute, selectedAMPM } = this.calendarState();
      return `${formattedValue} ${pad(selectedHour)}:${pad(selectedMinute)}${
        this.hourFormat() === '12' ? ' ' + selectedAMPM : ''
      }`;
    }
    return formattedValue;
  }

  private formatDatesToString(dates: (Date | null)[], separator: string): string {
    return dates.map((date) => (date ? formatDateToString(date, this.dateFormat()) : '')).join(` ${separator} `);
  }

  private updateInputValue(value: string): void {
    const input = this.inputElement.nativeElement;
    input.value = value;

    const changeEvent = new Event('change', { bubbles: true });
    input.dispatchEvent(changeEvent);
  }

  private autoFocusOnInput(value: string): void {
    const input = this.inputElement.nativeElement;
    input.focus();
    input.setSelectionRange(value.length, value.length);
  }

  private initializeSelectedDatesFromInput(): void {
    const state = this.calendarState();
    const { value } = this.inputElement.nativeElement;

    if (value && this.datepickerService.isValidDateString(value.split(' ')[0].trim(), state)) {
      switch (state.selectionMode) {
        case SELECTION_MODE.SINGLE: {
          this.setInputValueForSingleMode(value);
          break;
        }
        case SELECTION_MODE.MULTIPLE: {
          this.setInputValueForMultipleMode(value);
          break;
        }
        case SELECTION_MODE.RANGE: {
          this.setInputValueForRangeMode(value);
          break;
        }
      }
    } else {
      state.selectedDates = [];
    }
  }

  private closeCalendar(): void {
    if (this.autoClose() && !this.showTime()) {
      this.isCalendarOpen.set(false);
      this.initializeCalendarState();
    }
  }

  private initializeCalendarState(): void {
    const { hour, minute, period } = formatTimeToAmPm(new Date(), this.hourFormat());
    const defaultState: Partial<CalendarState> = {
      view: this.view(),
      displayedMonthsCount: this.displayedMonthsCount(),
      firstDayOfWeek: this.firstDayOfWeek(),
      minDate: this.minDate(),
      maxDate: this.maxDate(),
      selectionMode: this.selectionMode(),
      maxMultipleDateCount: this.maxMultipleDateCount(),
      rangeSeparator: this.rangeSeparator(),
      multipleSeparator: this.multipleSeparator(),
      dateFormat: this.dateFormat(),
      selectedDates: [],
      selectedHour: hour,
      selectedMinute: minute,
      selectedAMPM: period ?? TIME_PERIOD.AM,
      highlightWeekend: this.highlightWeekend(),
      showButtonBar: this.showButtonBar(),
      showTime: this.showTime(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      hourFormat: this.hourFormat(),
      months: [],
    };

    this.calendarState.set({ ...this.calendarState(), ...defaultState });
    this.initializeSelectedDatesFromInput();
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.isCalendarOpen()) {
      return;
    }

    if (
      event.target instanceof HTMLElement &&
      !this.inputElement.nativeElement.contains(event.target) &&
      !this.datepickerPanel.nativeElement.contains(event.target) &&
      !this.datepickerElement.nativeElement.contains(event.target)
    ) {
      this.isCalendarOpen.set(false);
      this.initializeCalendarState();
    }
  }
}
