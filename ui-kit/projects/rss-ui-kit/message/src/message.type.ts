export const MESSAGE_SIZE = {
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
} as const;

export type MessageSizeType = (typeof MESSAGE_SIZE)[keyof typeof MESSAGE_SIZE];

export const MESSAGE_VARIANT = {
  SIMPLE: 'simple',
  OUTLINED: 'outlined',
} as const;

export type MessageVariantType = (typeof MESSAGE_VARIANT)[keyof typeof MESSAGE_VARIANT];

export const MESSAGE_SEVERITY = {
  SUCCESS: 'success',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  CONTRAST: 'contrast',
  SECONDARY: 'secondary',
} as const;

export type MessageSeverityType = (typeof MESSAGE_SEVERITY)[keyof typeof MESSAGE_SEVERITY];
