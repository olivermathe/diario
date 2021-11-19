import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { slideInAnimation } from './animations';

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
  activeLink = '';
  
  constructor(private appUpdateService: UpdateService, private router: ActivatedRoute) {
    this.appUpdateService.start();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];

  }
  
}
