export const SIZE = {
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
} as const;

export type SizeType = (typeof SIZE)[keyof typeof SIZE];

export const INPUT_TEXT_VARIANT = {
  OUTLINED: 'outlined',
  FILLED: 'filled',
} as const;

export type InputTextVariantType = (typeof INPUT_TEXT_VARIANT)[keyof typeof INPUT_TEXT_VARIANT];

export const PASSWORD_FIELD_TYPE = {
  PASSWORD: 'password',
  TEXT: 'text',
} as const;

export type PasswordFieldType = (typeof PASSWORD_FIELD_TYPE)[keyof typeof PASSWORD_FIELD_TYPE];
