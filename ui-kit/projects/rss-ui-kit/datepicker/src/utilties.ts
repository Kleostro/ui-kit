import { CalendarState, DateParts, TimeParts } from './datepicker.type';

/* eslint-disable no-magic-numbers */
export const pad = (number_: number, length = 2): string => number_.toString().padStart(length, '0');

export const formatDateToString = (date: Date, dateFormat: string): string => {
  return dateFormat.replaceAll(/(yyyy|yy|mm|m|dd|d)/g, (match) => {
    switch (match) {
      case 'yyyy': {
        return date.getFullYear().toString();
      }
      case 'yy': {
        return date.getFullYear().toString().slice(-2);
      }
      case 'mm': {
        return pad(date.getMonth() + 1);
      }
      case 'm': {
        return (date.getMonth() + 1).toString();
      }
      case 'dd': {
        return pad(date.getDate());
      }
      case 'd': {
        return date.getDate().toString();
      }
      default: {
        return match;
      }
    }
  });
};

const generateRegexPattern = (formatParts: string[]): string => {
  return formatParts
    .map((part) => {
      switch (part) {
        case 'yyyy': {
          return String.raw`(\d{4})`;
        }
        case 'yy': {
          return String.raw`(\d{2})`;
        }
        case 'mm': {
          return String.raw`(\d{2})`;
        }
        case 'm': {
          return String.raw`(\d{1,2})`;
        }
        case 'dd': {
          return String.raw`(\d{2})`;
        }
        case 'd': {
          return String.raw`(\d{1,2})`;
        }
        default: {
          return part.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
        }
      }
    })
    .join('');
};

const extractDateParts = (match: RegExpMatchArray, formatParts: string[]): DateParts => {
  const dateParts: DateParts = { year: null, month: 1, day: 1 };
  let matchIndex = 1;

  for (const part of formatParts) {
    if (/^(yyyy|yy|mm|m|dd|d)$/.test(part)) {
      const value = Number.parseInt(match[matchIndex], 10);
      switch (part) {
        case 'yyyy': {
          dateParts.year = value;
          break;
        }
        case 'yy': {
          dateParts.year = value < 50 ? 2000 + value : 1900 + value;
          break;
        }
        case 'mm':
        case 'm': {
          dateParts.month = value < 13 ? value : null;
          break;
        }
        case 'dd':
        case 'd': {
          dateParts.day = value;
          break;
        }
      }
      matchIndex++;
    }
  }

  return dateParts;
};

export const formatTimeToAmPm = (date: Date, formatHour: string): TimeParts => {
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (formatHour === '12') {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHours = hour % 12 || 12;
    return {
      hour: formattedHours,
      minute,
      period,
    };
  } else {
    return {
      hour,
      minute,
    };
  }
};

export const parseDate = (value: string, calendarState: CalendarState): Date | null => {
  if (!value || !calendarState.dateFormat) {
    return null;
  }

  const formatParts = calendarState.dateFormat.match(/(yyyy|yy|mm|m|dd|d|[^a-zA-Z0-9]+)/g);
  if (!formatParts) {
    return null;
  }

  const regexPattern = generateRegexPattern(formatParts);
  const regex = new RegExp(`^${regexPattern}$`);
  const match = value.match(regex);
  if (!match) {
    return null;
  }

  const { year, month, day } = extractDateParts(match, formatParts);

  if (year && month && day) {
    const parsedDate = new Date(year, month - 1, day, calendarState.selectedHour, calendarState.selectedMinute);
    return parsedDate;
  }
  return null;
};

export const compareDates = (date1: Date | null, date2: Date | null): boolean => {
  return (
    date1?.getFullYear() === date2?.getFullYear() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getDate() === date2?.getDate()
  );
};
