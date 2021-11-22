import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private readonly authService: AuthService) {
    this.loginWithGoogle();
    // this.authService.logOut();
  }

  loginWithGoogle() {
    this.authService.GoogleAuth();
  }

}
