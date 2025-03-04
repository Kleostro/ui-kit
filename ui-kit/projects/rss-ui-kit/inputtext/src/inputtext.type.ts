export const INPUT_TEXT_VARIANT = {
  OUTLINED: 'outlined',
  FILLED: 'filled',
} as const;

export type InputTextVariantType = (typeof INPUT_TEXT_VARIANT)[keyof typeof INPUT_TEXT_VARIANT];
