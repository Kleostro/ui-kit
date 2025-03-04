export const SIZE = {
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
} as const;

export type SizeType = (typeof SIZE)[keyof typeof SIZE];

export const BUTTON_SEVERITY = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARN: 'warn',
  INFO: 'info',
  CONTRAST: 'contrast',
} as const;

export type ButtonSeverityType = (typeof BUTTON_SEVERITY)[keyof typeof BUTTON_SEVERITY];

export const BUTTON_ICON_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type ButtonIconPositionType = (typeof BUTTON_ICON_POSITION)[keyof typeof BUTTON_ICON_POSITION];

export const BUTTON_VARIANT = {
  TEXT: 'text',
  OUTLINED: 'outlined',
} as const;

export type ButtonVariantType = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export type ButtonTypeType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];
