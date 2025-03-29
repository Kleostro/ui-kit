/* eslint-disable no-magic-numbers */
import { Injectable } from '@angular/core';
import {
  DayStructure,
  MonthStructure,
  CalendarState,
  WeekStructure,
  SELECTION_MODE,
  VIEW,
  TIME_PERIOD,
} from '../../datepicker.type';
import { compareDates, parseDate } from '../../utilties';

@Injectable()
export class DatepickerService {
  public decrementMonth(calendarState: CalendarState): number {
    let { currentMonth, currentYear } = calendarState;

    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }

    calendarState.currentMonth = currentMonth;
    calendarState.currentYear = currentYear;
    this.createCalendarMonths(calendarState);

    return currentMonth;
  }

  public incrementMonth(calendarState: CalendarState): number {
    let { currentMonth, currentYear } = calendarState;

    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }

    calendarState.currentMonth = currentMonth;
    calendarState.currentYear = currentYear;
    this.createCalendarMonths(calendarState);
    return currentMonth;
  }

  public decrementYear(calendarState: CalendarState): number {
    calendarState.currentYear--;
    this.createCalendarMonths(calendarState);
    return calendarState.currentYear;
  }

  public incrementYear(calendarState: CalendarState): number {
    calendarState.currentYear++;
    this.createCalendarMonths(calendarState);
    return calendarState.currentYear;
  }

  public createCalendarMonths(calendarState: CalendarState): void {
    const { currentMonth, currentYear, displayedMonthsCount, view } = calendarState;

    const months: MonthStructure[] = [];

    if (view === VIEW.MONTH) {
      for (let index = 0; index < displayedMonthsCount; index++) {
        const year = currentYear + index;
        const month = (currentMonth + index) % 12;
        months.push(this.createMonth(year, month, calendarState));
      }
    } else {
      for (let index = 0; index < displayedMonthsCount; index++) {
        const totalMonths = currentMonth + index;
        const year = currentYear + Math.floor(totalMonths / 12);
        const month = totalMonths % 12;

        months.push(this.createMonth(year, month, calendarState));
      }
    }

    calendarState.months = months;
  }

  public updateDateRange(currentDateRange: (Date | null)[], date: Date | null): (Date | null)[] {
    if (currentDateRange.length === 0 || !currentDateRange[1]) {
      if (!currentDateRange[0]) {
        currentDateRange[0] = date;
      } else if (date && Number.isInteger(currentDateRange[0]?.getTime())) {
        currentDateRange[1] = date;
      } else {
        currentDateRange[0] = date;
        currentDateRange[1] = null;
      }
    } else {
      currentDateRange[0] = date;
      currentDateRange[1] = null;
    }
    return currentDateRange;
  }

  public updateDaySelectionStates(calendarState: CalendarState): void {
    for (const month of calendarState.months) {
      for (const day of month.days) {
        this.updateDayState(day, calendarState);
      }
    }
  }

  public incrementHour(calendarState: CalendarState): number {
    const selectedHour = calendarState.selectedHour;
    let hour = 0;
    if (calendarState.hourFormat === '24') {
      hour = selectedHour === 23 ? 0 : selectedHour + 1;
    } else {
      hour = selectedHour === 12 ? 1 : selectedHour + 1;
      if (hour === 12) {
        calendarState.selectedAMPM = calendarState.selectedAMPM === TIME_PERIOD.AM ? TIME_PERIOD.PM : TIME_PERIOD.AM;
      }
    }

    calendarState.selectedHour = hour;
    return hour;
  }

  public decrementHour(calendarState: CalendarState): number {
    const selectedHour = calendarState.selectedHour;
    let hour = 0;
    if (calendarState.hourFormat === '24') {
      hour = selectedHour === 0 ? 23 : selectedHour - 1;
    } else {
      hour = selectedHour === 1 ? 12 : selectedHour - 1;
      if (hour === 11) {
        calendarState.selectedAMPM = calendarState.selectedAMPM === TIME_PERIOD.AM ? TIME_PERIOD.PM : TIME_PERIOD.AM;
      }
    }

    calendarState.selectedHour = hour;
    return hour;
  }

  public incrementMinute(calendarState: CalendarState): number {
    const minute = calendarState.selectedMinute === 59 ? 0 : calendarState.selectedMinute + 1;

    if (minute === 0) {
      this.incrementHour(calendarState);
    }

    calendarState.selectedMinute = minute;
    return minute;
  }

  public decrementMinute(calendarState: CalendarState): number {
    const minute = calendarState.selectedMinute === 0 ? 59 : calendarState.selectedMinute - 1;

    if (minute === 59) {
      this.decrementHour(calendarState);
    }

    calendarState.selectedMinute = minute;
    return minute;
  }

  public toggleAMPM(calendarState: CalendarState): string {
    calendarState.selectedAMPM = calendarState.selectedAMPM === TIME_PERIOD.AM ? TIME_PERIOD.PM : TIME_PERIOD.AM;
    return calendarState.selectedAMPM;
  }

  private updateDayState(day: DayStructure, calendarState: CalendarState): DayStructure {
    day.isSelected = false;
    const { selectedDates, selectionMode, maxMultipleDateCount } = calendarState;

    switch (selectionMode) {
      case SELECTION_MODE.SINGLE: {
        day.isSelected = compareDates(day.date, selectedDates[0]);
        break;
      }
      case SELECTION_MODE.MULTIPLE: {
        const isIncluded = selectedDates.some((date) => day.date.getTime() === date?.getTime());

        if (maxMultipleDateCount && selectedDates.length === maxMultipleDateCount) {
          day.isDisabled = !isIncluded;
          day.isSelected = isIncluded;
        } else if (maxMultipleDateCount && selectedDates.length < maxMultipleDateCount) {
          day.isSelected = isIncluded;
          day.isDisabled = this.checkIfDayDisabled(day.date, calendarState);
        } else {
          day.isSelected = isIncluded;
        }

        break;
      }
      case SELECTION_MODE.RANGE: {
        const [startDate, endDate] = selectedDates;

        if (startDate && endDate) {
          const [sortStartDate, sortEndDate] = this.sortDateRange(startDate, endDate, calendarState);
          calendarState.selectedDates = [sortStartDate, sortEndDate];

          day.isSelected =
            day.date.getTime() === sortStartDate.getTime() || day.date.getTime() === sortEndDate.getTime();
          day.isSelectedInRange =
            day.date.getTime() > sortStartDate.getTime() && day.date.getTime() < sortEndDate.getTime();
        } else {
          day.isSelectedInRange = false;
          day.isSelected = day.date.getTime() === selectedDates[0]?.getTime();
        }

        break;
      }
    }

    return day;
  }

  private createMonth(year: number, month: number, calendarState: CalendarState): MonthStructure {
    const daysInMonth = this.getDaysInMonth(year, month);
    const firstDayOfMonth = this.getFirstDayOfMonth(year, month);
    const days: DayStructure[] = [];
    const weeks: WeekStructure[] = [];

    const adjustedFirstDay = (firstDayOfMonth - calendarState.firstDayOfWeek + 7) % 7;

    const previousMonth = this.getPreviousYearAndMonth(year, month);
    const previousMonthDaysCount = this.getDaysInMonth(previousMonth.year, previousMonth.month);
    for (let index = adjustedFirstDay; index > 0; index--) {
      const dayNumber = previousMonthDaysCount - index + 1;
      const date = new Date(previousMonth.year, previousMonth.month, dayNumber);
      date.setHours(0, 0, 0, 0);
      days.push(this.createDay(date, false, calendarState));
    }

    for (let index = 1; index <= daysInMonth; index++) {
      const date = new Date(year, month, index);
      date.setHours(0, 0, 0, 0);
      days.push(this.createDay(date, true, calendarState));
    }

    const indexOflastDayOfMonth = this.getLastDayOfMonth(year, month);
    if (indexOflastDayOfMonth !== -1) {
      const nextMonth = this.getNextYearAndMonth(year, month);
      const lastDayOfMonth = new Date(nextMonth.year, nextMonth.month, 0);
      const remainingDays = Math.abs((indexOflastDayOfMonth - calendarState.firstDayOfWeek - 7) % 7);
      for (let index = 1; index <= remainingDays; index++) {
        const dayNumber = lastDayOfMonth.getDate() + index;
        const date = new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), dayNumber);
        date.setHours(0, 0, 0, 0);
        days.push(this.createDay(date, false, calendarState));
      }
    }

    for (let index = 0; index < days.length; index += 7) {
      weeks.push({ days: days.slice(index, index + 7) });
    }

    return { year, month, weeks, days };
  }

  private createDay(date: Date, isCurrentMonth: boolean, calendarState: CalendarState): DayStructure {
    return {
      date,
      dayNumber: date.getDate(),
      isCurrentMonth,
      isToday: this.isToday(date),
      isWeekend: this.isWeekend(date),
      isSelected: false,
      isSelectedInRange: false,
      isDisabled: this.checkIfDayDisabled(date, calendarState),
    };
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  private isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  private getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDay();
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private getLastDayOfMonth(year: number, month: number): number {
    return new Date(year, month, this.getDaysInMonth(year, month)).getDay();
  }

  private getPreviousYearAndMonth(year: number, month: number): { year: number; month: number } {
    return month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
  }

  private getNextYearAndMonth(year: number, month: number): { year: number; month: number } {
    return month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };
  }

  public checkIfDayDisabled(date: Date, calendarState: CalendarState): boolean {
    const { minDate, maxDate } = calendarState;
    let isDisabled = false;

    if (minDate && date < minDate) {
      isDisabled = true;
    }

    if (maxDate && date > maxDate) {
      isDisabled = true;
    }

    return isDisabled;
  }

  public isValidDateString(value: string, calendarState: CalendarState): boolean {
    const { selectionMode } = calendarState;

    switch (selectionMode) {
      case SELECTION_MODE.SINGLE: {
        return this.validateSingleDate(value, calendarState);
      }

      case SELECTION_MODE.RANGE: {
        return this.validateDateRange(value, calendarState);
      }

      case SELECTION_MODE.MULTIPLE: {
        return this.validateMultipleDates(value, calendarState);
      }

      default: {
        return false;
      }
    }
  }

  private validateSingleDate(value: string, calendarState: CalendarState): boolean {
    const date = parseDate(value, calendarState);
    return !!date && !Number.isNaN(date.getTime());
  }

  private validateDateRange(value: string, calendarState: CalendarState): boolean {
    const [startDateString, endDateString] = value
      .split(` ${calendarState.rangeSeparator} `)
      .map((part) => part.trim());

    if (!startDateString || !endDateString) {
      return false;
    }

    const startDate = parseDate(startDateString, calendarState);
    const endDate = parseDate(endDateString, calendarState);

    return !Number.isNaN(startDate?.getTime()) && !Number.isNaN(endDate?.getTime());
  }

  private validateMultipleDates(value: string, calendarState: CalendarState): boolean {
    const dateStrings = value.split(`${calendarState.multipleSeparator} `).map((part) => part.trim());

    const result = dateStrings.every((dateString) => {
      const date = parseDate(dateString, calendarState);
      return !!date && !Number.isNaN(date.getTime());
    });

    return result;
  }

  public sortDateRange(startDate: Date, endDate: Date, calendarState: CalendarState): Date[] {
    const start = startDate.getTime() < endDate.getTime() ? startDate : endDate;
    const end = startDate.getTime() < endDate.getTime() ? endDate : startDate;
    calendarState.selectedDates = [start, end];
    return [start, end];
  }
}
