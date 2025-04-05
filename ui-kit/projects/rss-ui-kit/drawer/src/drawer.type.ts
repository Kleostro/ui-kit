export const DRAWER_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  FULL: 'full',
} as const;

export type DrawerPositionType = (typeof DRAWER_POSITION)[keyof typeof DRAWER_POSITION];
