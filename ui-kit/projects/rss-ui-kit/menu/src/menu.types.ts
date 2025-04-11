export interface MenuItemCallbackEvent {
  originalEvent?: Event;
  item?: MenuItem | null;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  target?: string;
  url?: string;
  title?: string;
  disabled?: boolean;
  route?: string;
  routerLink?: string;
  separator?: 'top' | 'bottom' | boolean;
  children?: MenuItem[];
  callback?: (event: MenuItemCallbackEvent) => void;
}
