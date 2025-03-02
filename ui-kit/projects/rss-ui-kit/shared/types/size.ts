export const SIZE = {
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
} as const;

export type SizeType = (typeof SIZE)[keyof typeof SIZE];
