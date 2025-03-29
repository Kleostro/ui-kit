import { Component, inject, input, OnInit, output } from '@angular/core';
import { CalendarState, SELECTION_MODE, VIEW } from '../../datepicker.type';
import { TRANSLATION } from '../../datepicker.constants';
import { DatepickerService } from '../../services/datepicker/datepicker.service';
import { compareDates, formatTimeToAmPm } from '../../utilties';

const notFoundIndex = -1;
const decadeYearsCount = 10;
const initialTimeButtonSpeed = 200;
const maxTimeButtonSpeed = 1;
const timeButtonSpeedStep = 50;

@Component({
  selector: 'rss-datepicker-calendar',
  templateUrl: './datepicker-calendar.component.html',
  standalone: false,
})
export class DatepickerCalendarComponent implements OnInit {
  public readonly translation = TRANSLATION;

  public calendarState = input.required<CalendarState>();

  public onDateSelected = output<Date | null>();
  public onMonthChanged = output<number>();
  public onYearChanged = output<number>();
  public onHourChanged = output<number>();
  public onMinuteChanged = output<number>();
  public onAMPMChanged = output<string>();

  public datepickerService = inject(DatepickerService);

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private currentSpeed!: number;

  public ngOnInit(): void {
    this.datepickerService.createCalendarMonths(this.calendarState());
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public getWeekdayLabels(): string[] {
    const { firstDayOfWeek } = this.calendarState();
    const shiftedLabels = [
      ...this.translation.dayNamesShort.slice(firstDayOfWeek),
      ...this.translation.dayNamesShort.slice(0, firstDayOfWeek),
    ];
    return shiftedLabels;
  }

  public decrementYearClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onYearChanged.emit(this.datepickerService.decrementYear(this.calendarState()));
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public decadeYears(calendarIndex: number): number[] {
    const { currentYear } = this.calendarState();
    const startYear = Math.floor(currentYear / decadeYearsCount) * decadeYearsCount;

    const offset = calendarIndex * decadeYearsCount;

    return Array.from({ length: decadeYearsCount }, (_, index) => startYear + index + offset);
  }

  public onToday(): void {
    const state = this.calendarState();
    const today = new Date();
    const time = formatTimeToAmPm(today, state.hourFormat);

    state.selectedHour = time.hour;
    state.selectedMinute = time.minute;
    state.currentYear = today.getFullYear();
    state.currentMonth = today.getMonth();

    if (state.selectionMode === SELECTION_MODE.SINGLE) {
      state.selectedDates = [today];
    } else if (
      state.selectionMode === SELECTION_MODE.MULTIPLE &&
      state.selectedDates.every((date) => date?.getTime() !== today.getTime())
    ) {
      state.selectedDates.push(today);
    } else if (state.selectionMode === SELECTION_MODE.RANGE) {
      state.selectedDates = [today];
    }

    this.datepickerService.createCalendarMonths(state);
    this.datepickerService.updateDaySelectionStates(state);
    this.onDateSelected.emit(today);
  }

  public onClear(): void {
    const state = this.calendarState();
    const today = new Date();
    state.currentYear = today.getFullYear();
    state.currentMonth = today.getMonth();
    state.selectedDates = [];
    this.datepickerService.createCalendarMonths(state);
    this.datepickerService.updateDaySelectionStates(state);
    this.onDateSelected.emit(null);
  }

  public handleSelectMonth(event: MouseEvent, monthNameShort: string, calendarIndex: number): void {
    event.stopPropagation();
    const state = this.calendarState();
    const monthIndex = this.translation.monthNamesShort.indexOf(monthNameShort);

    if (monthIndex === notFoundIndex) {
      return;
    }

    state.currentMonth = monthIndex;
    state.currentYear = this.calendarState().months[calendarIndex].year;
    const selectedDate = new Date(this.calendarState().months[calendarIndex].year, state.currentMonth, 1);

    if (/d{1,2}/.test(state.dateFormat)) {
      state.view = VIEW.DATE;
    } else {
      this.handleDateSelection(selectedDate);
    }

    this.datepickerService.createCalendarMonths(state);
    this.datepickerService.updateDaySelectionStates(state);
  }

  public handleSelectYear(event: MouseEvent, year: number): void {
    event.stopPropagation();
    const state = this.calendarState();
    state.currentYear = year;

    const selectedDate = new Date(state.currentYear, 0, 1);

    if (!/m{1,2}/.test(state.dateFormat)) {
      this.handleDateSelection(selectedDate);
    } else if (/d{1,2}/.test(state.dateFormat)) {
      state.view = VIEW.MONTH;
    } else {
      state.view = VIEW.MONTH;
    }

    this.datepickerService.createCalendarMonths(state);
    this.datepickerService.updateDaySelectionStates(state);
  }

  public handleDateSelection(date: Date): void {
    const state = this.calendarState();

    switch (state.selectionMode) {
      case SELECTION_MODE.SINGLE: {
        this.handleSingleSelection(date);
        break;
      }
      case SELECTION_MODE.MULTIPLE: {
        this.handleMultipleSelection(date);
        break;
      }
      case SELECTION_MODE.RANGE: {
        this.handleRangeSelection(date);
        break;
      }
    }
  }

  public decrementDecadeClick(event: MouseEvent): void {
    event.stopPropagation();
    const state = this.calendarState();
    state.currentYear -= decadeYearsCount * state.displayedMonthsCount;
    this.datepickerService.updateDaySelectionStates(state);
  }

  public decrementMonthClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onMonthChanged.emit(this.datepickerService.decrementMonth(this.calendarState()));
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public setMonthViewClick(event: MouseEvent): void {
    event.stopPropagation();
    this.calendarState().view = VIEW.MONTH;
    this.datepickerService.createCalendarMonths(this.calendarState());
  }

  public setYearViewClick(event: MouseEvent): void {
    event.stopPropagation();
    this.calendarState().view = VIEW.YEAR;
    this.datepickerService.createCalendarMonths(this.calendarState());
  }

  public incrementDecadeClick(event: MouseEvent): void {
    event.stopPropagation();
    const state = this.calendarState();
    state.currentYear += decadeYearsCount * state.displayedMonthsCount;
    this.datepickerService.updateDaySelectionStates(state);
  }

  public incrementMonthClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onMonthChanged.emit(this.datepickerService.incrementMonth(this.calendarState()));
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public incrementYearClick(event: MouseEvent): void {
    event.stopPropagation();
    this.onYearChanged.emit(this.datepickerService.incrementYear(this.calendarState()));
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public isSelectedYear(year: number): boolean {
    return !!this.calendarState().selectedDates.some((date) => date?.getFullYear() === year);
  }

  public isSelectedMonth(monthIndex: number, calendarIndex: number): boolean {
    const { selectedDates, months } = this.calendarState();
    return !!selectedDates.some(
      (date) => date?.getMonth() === monthIndex && date.getFullYear() === months[calendarIndex].year,
    );
  }

  public incrementHourClick(event: MouseEvent): void {
    event.stopPropagation();
    this.datepickerService.incrementHour(this.calendarState());

    this.onDateSelected.emit(this.calendarState().selectedDates[0] ?? new Date());

    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public decrementHourClick(event: MouseEvent): void {
    event.stopPropagation();
    this.datepickerService.decrementHour(this.calendarState());

    this.onDateSelected.emit(this.calendarState().selectedDates[0] ?? new Date());
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public incrementMinuteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.datepickerService.incrementMinute(this.calendarState());

    this.onDateSelected.emit(this.calendarState().selectedDates[0] ?? new Date());
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public decrementMinuteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.datepickerService.decrementMinute(this.calendarState());

    this.onDateSelected.emit(this.calendarState().selectedDates[0] ?? new Date());
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  public startTimeInterval(clickMethod: (_: MouseEvent) => void): void {
    this.currentSpeed = initialTimeButtonSpeed;
    clickMethod(new MouseEvent('mousedown'));

    this.intervalId = setInterval(() => {
      clickMethod(new MouseEvent('mousedown'));

      if (this.currentSpeed > maxTimeButtonSpeed && this.intervalId) {
        this.currentSpeed -= timeButtonSpeedStep;
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
          clickMethod(new MouseEvent('mousedown'));
        }, this.currentSpeed);
      }
    }, this.currentSpeed);
  }

  public stopTimeInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.currentSpeed = initialTimeButtonSpeed;
    }
  }

  public toggleAMPMClick(event: MouseEvent): void {
    event.stopPropagation();
    this.datepickerService.toggleAMPM(this.calendarState());

    this.onDateSelected.emit(this.calendarState().selectedDates[0] ?? new Date());
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  private handleSingleSelection(date: Date): void {
    this.calendarState().selectedDates = [date];
    this.datepickerService.updateDaySelectionStates(this.calendarState());
    this.onDateSelected.emit(date);
  }

  private handleMultipleSelection(date: Date): void {
    const state = this.calendarState();

    if (!state.maxMultipleDateCount || state.selectedDates.length < state.maxMultipleDateCount) {
      if (state.selectedDates.some((selectedDate) => compareDates(selectedDate, date))) {
        state.selectedDates = state.selectedDates.filter((selectedDate) => !compareDates(selectedDate, date));
        this.onDateSelected.emit(date);
      } else {
        state.selectedDates.push(date);
        this.onDateSelected.emit(date);
      }
    } else if (
      state.selectedDates.length === state.maxMultipleDateCount &&
      state.selectedDates.some((selectedDate) => compareDates(selectedDate, date))
    ) {
      state.selectedDates = state.selectedDates.filter((selectedDate) => !compareDates(selectedDate, date));
      this.onDateSelected.emit(date);
    }
    this.datepickerService.updateDaySelectionStates(this.calendarState());
  }

  private handleRangeSelection(date: Date): void {
    this.datepickerService.updateDateRange(this.calendarState().selectedDates, date);
    this.datepickerService.updateDaySelectionStates(this.calendarState());
    this.onDateSelected.emit(date);
  }
}
