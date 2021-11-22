import { Injectable } from '@angular/core';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
import { AuthProvider, GoogleAuthProvider, User } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService implements CanActivate {

    user: Observable<firebase.default.User | null>;

    constructor(
        private readonly afAuth: AngularFireAuth,
        private readonly router: Router,
    )
    {
        this.user = afAuth.authState;
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.user.pipe(
            map(user => user !== null),
            tap(isAuthenticate => !isAuthenticate ? this.router.navigate(['login']) : isAuthenticate)
        );
    }

    logOut() {
        this.afAuth.signOut();
    }

    GoogleAuth() {
        return this.AuthLogin(new GoogleAuthProvider());
    }

    AuthLogin(provider: AuthProvider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                console.log('You have been successfully logged in!', result);
            }).catch((error) => {
                console.log(error);
            });
    }



}