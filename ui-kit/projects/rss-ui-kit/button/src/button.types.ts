export const SEVERITY = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARN: 'warn',
  INFO: 'info',
  CONTRAST: 'contrast',
} as const;

export type SeverityType = (typeof SEVERITY)[keyof typeof SEVERITY];

export const SIZE = {
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
} as const;

export type SizeType = (typeof SIZE)[keyof typeof SIZE];

export const ICON_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type IconPositionType = (typeof ICON_POSITION)[keyof typeof ICON_POSITION];
