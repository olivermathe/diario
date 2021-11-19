import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { MessagePayload } from '@firebase/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class MessagingService {

    currentMessage = new BehaviorSubject<any>({});
    
    constructor(private angularFireMessaging: AngularFireMessaging) {}
    
    requestPermission() {
        this.angularFireMessaging.requestPermission.subscribe(
            () => { console.log('Permission granted!'); },
            (error) => { console.error(error); },  
        );
    }

    receiveMessage() {
        this.angularFireMessaging.messages.subscribe((message) => {
            debugger
            console.log(message);
            this.currentMessage.next(message);
        });
    }
}