import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { slideInAnimation } from './animations';
import { AuthService } from './services/auth.service';
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

  showSplashScreen = true;

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

  showTabs = false;

  constructor(
    private appUpdateService: UpdateService,
    private messagingService: MessagingService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.showTabs = user !== null;
        this.router.navigate(['home']);
        this.activeLink = 'home';
      }
    });
    this.appUpdateService.start();
    this.messagingService.request();
    setTimeout(() => this.showSplashScreen = false, 4000);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

}
