import { Component } from '@angular/core';
import { environment } from '../environments/environment';

import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  version = environment.version;
  
  constructor(private appUpdateService: UpdateService) {
    this.appUpdateService.start();
  }
}
