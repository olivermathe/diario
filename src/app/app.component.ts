import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { slideInAnimation } from './animations';
import { MessagingService } from './services/messaging.service';

import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {

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

  message: any;
  token: any;

  constructor(
    private appUpdateService: UpdateService,
    private messagingService: MessagingService
  ) {
    this.messagingService.request();
    this.token = this.messagingService.token$;
    this.message = this.messagingService.message$;
    this.messagingService.message$.subscribe(m => console.log(m));
    this.appUpdateService.start();
    console.log('asdasda', navigator && navigator.serviceWorker);
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', this.onReceiveMsg.bind(this));
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  onReceiveMsg(fcmMessage: any) {
    console.log('foreground', fcmMessage);
  }

}
