import { animate, state, style, transition, trigger } from '@angular/animations';

export const overlayAnimation = trigger('overlayAnimation', [
  state(
    'visibleTouchUI',
    style({
      transform: 'translate(-50%,-50%)',
      opacity: 1,
    }),
  ),
  transition('void => visible', [
    style({ opacity: 0, transform: 'scaleY(0.8)' }),
    animate('{{showTransitionParams}}', style({ opacity: 1, transform: '*' })),
  ]),
  transition('visible => void', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]),
  transition('void => visibleTouchUI', [
    style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
    animate('{{showTransitionParams}}'),
  ]),
  transition('visibleTouchUI => void', [
    animate(
      '{{hideTransitionParams}}',
      style({
        opacity: 0,
        transform: 'translate3d(-50%, -40%, 0) scale(0.9)',
      }),
    ),
  ]),
]);
