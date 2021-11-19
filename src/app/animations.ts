import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage => MonthPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          overflow: 'hidden ',
          position: 'absolute',
          top: 0,
          left: 0,
        })
      ]),
      query(':leave', [
        style({
          zIndex: 1,
          width: '100%',
          left: '0%'
        })
      ]),
      query(':enter', [
        style({
          boxShadow: '-6px 6px 4px rgba(0, 0, 0, 0.25)',
          zIndex: 200,
          width: '0%',
          left: '100%'
        })
      ]),
      query(':leave', animateChild()),
      group([
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%', width: '100%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('MonthPage => HomePage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            overflow: 'hidden ',
            position: 'absolute',
            top: 0,
            left: 0,
          })
        ]),
        query(':leave', [
          style({
            boxShadow: '-6px 6px 4px rgba(0, 0, 0, 0.25)',
            zIndex: 200,
            width: '100%',
            left: '0%'
          })
        ]),
        query(':enter', [
          style({
            zIndex: 1,
            width: '100%',
            left: '0%'
          })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ left: '100%', width: '0%' }))
          ]),
        ]),
        query(':enter', animateChild()),
    ]),
  ]);