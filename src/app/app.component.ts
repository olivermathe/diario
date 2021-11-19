import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { slideInAnimation } from './animations';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

import { UpdateService } from './services/update.service';
import { EMPTY, from, Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

  message = {};

  version = environment.version;
  links = [
    {
      label: 'inicio',
      icon: 'home',
      path: 'home'
    },
    {
      label: 'extrato',
      icon: 'format_list_bulleted',
      path: 'extrato'
    }
  ];
  activeLink = 'home';

  token$: Observable<any> = EMPTY;
  message$: Observable<any> = EMPTY;
  showRequest = false;
  
  constructor(
    private appUpdateService: UpdateService,
    private messaging: Messaging,
    private angularFireMessaging: AngularFireMessaging 
  ) {
    this.token$ = from(
      navigator.serviceWorker.register('firebase-messaging-sw.js', { type: 'module', scope: '__' }).
        then(serviceWorkerRegistration =>
          getToken(this.messaging, {
            serviceWorkerRegistration,
            vapidKey: environment.vapidKey,
          })
        )).pipe(
          tap(token => console.log('FCM', {token})),
          share()
        );
    this.message$ = new Observable(sub => onMessage(messaging, it => sub.next(it))).pipe(
      tap(it => console.log('FCM', it)),
    );
    this.appUpdateService.start();
    this.requestPermission();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  requestPermission() {
    this.angularFireMessaging.requestPermission.subscribe(
        () => { console.log('Permission granted!'); },
        (error: any) => { console.error(error); },  
    );
}
  
}
