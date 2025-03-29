export interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

export interface DateParts {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface TimeParts {
  hour: number;
  minute: number;
  period?: TimePeriodType;
}

export const SELECTION_MODE = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  RANGE: 'range',
} as const;

export type SelectionModeType = (typeof SELECTION_MODE)[keyof typeof SELECTION_MODE];

export const VIEW = {
  DATE: 'date',
  MONTH: 'month',
  YEAR: 'year',
  TIME: 'time',
} as const;

export type ViewType = (typeof VIEW)[keyof typeof VIEW];

export const VARIANT = {
  OUTLINED: 'outlined',
  FILLED: 'filled',
} as const;

export type VariantType = (typeof VARIANT)[keyof typeof VARIANT];

export const SIZE = {
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
} as const;

export type SizeType = (typeof SIZE)[keyof typeof SIZE];

export const TIME_PERIOD = {
  AM: 'AM',
  PM: 'PM',
} as const;

export type TimePeriodType = (typeof TIME_PERIOD)[keyof typeof TIME_PERIOD];

export interface SelectionState {
  selectedDates: string[];
  selectionMode: SelectionModeType;
  maxSelectionCount?: number;
}

export interface CalendarState {
  currentMonth: number;
  currentYear: number;
  displayedMonthsCount: number;
  minDate: Date | null;
  maxDate: Date | null;
  months: MonthStructure[];
  selectedDates: (Date | null)[];
  selectedHour: number;
  selectedMinute: number;
  selectedAMPM: TimePeriodType;
  selectionMode: SelectionModeType;
  maxMultipleDateCount: number | null;
  firstDayOfWeek: number;
  rangeSeparator: string;
  multipleSeparator: string;
  dateFormat: string;
  showButtonBar: boolean;
  highlightWeekend: boolean;
  showTime: boolean;
  hourFormat: string;
  view: ViewType;
}

export const initialCalendarState: CalendarState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  displayedMonthsCount: 1,
  minDate: null,
  maxDate: null,
  months: [],
  selectedDates: [],
  selectedHour: new Date().getHours(),
  selectedMinute: new Date().getMinutes(),
  selectedAMPM: TIME_PERIOD.AM,
  selectionMode: SELECTION_MODE.SINGLE,
  maxMultipleDateCount: null,
  firstDayOfWeek: 0,
  rangeSeparator: '-',
  multipleSeparator: ',',
  dateFormat: 'dd.mm.yyyy',
  showButtonBar: false,
  highlightWeekend: false,
  showTime: false,
  hourFormat: '24',
  view: VIEW.DATE,
};
export interface MonthStructure {
  year: number;
  month: number;
  weeks: WeekStructure[];
  days: DayStructure[];
}

export interface WeekStructure {
  days: DayStructure[];
}

export interface DayStructure {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  isSelectedInRange: boolean;
  isDisabled: boolean;
}
