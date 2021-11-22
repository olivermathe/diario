import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent {
    version = environment.version;
    constructor() {}

}
