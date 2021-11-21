import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { EMPTY, Observable } from 'rxjs'
import { trace } from '@angular/fire/compat/performance';
import { tap } from 'rxjs/operators';

@Injectable()
export class MessagingService {

    token$: Observable<any> = EMPTY;
    message$: Observable<any> = EMPTY;
    showRequest = false;

    constructor(private readonly messaging: AngularFireMessaging) {
        this.message$ = messaging.messages;
        this.token$ = messaging.tokenChanges.pipe(
            trace('token'),
            tap(token => this.showRequest = !token)
        );
    }

    request() {
        this.messaging.requestPermission.subscribe(console.log, console.error);
    }

}