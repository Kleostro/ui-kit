export const TOAST_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'danger',
  WARN: 'warn',
  INFO: 'info',
  SECONDARY: 'secondary',
  CONTRAST: 'contrast',
} as const;

export type ToastSeverityType = (typeof TOAST_SEVERITY)[keyof typeof TOAST_SEVERITY];

export const TOAST_POSITION = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
} as const;

export type ToastPositionType = (typeof TOAST_POSITION)[keyof typeof TOAST_POSITION];

export interface ToastItem {
  id?: string;
  isDying?: boolean;
  severity?: ToastSeverityType;
  icon?: string;
  detail: string;
  summary?: string;
  life?: number;
}
