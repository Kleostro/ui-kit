export const FLOAT_LABEL_VARIANT = {
  OVER: 'over',
  IN: 'in',
  ON: 'on',
} as const;

export type FloatLabelVariantType = (typeof FLOAT_LABEL_VARIANT)[keyof typeof FLOAT_LABEL_VARIANT];
