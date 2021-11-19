import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
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
  
  constructor(
    private appUpdateService: UpdateService,
    private router: ActivatedRoute,
    private messagingService: MessagingService
  ) {
    this.appUpdateService.start();
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];

  }
  
}
