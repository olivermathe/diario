import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {

    confirmModal?: NzModalRef;

    constructor(
        private readonly updates: SwUpdate,
        private readonly modal: NzModalService,
        private readonly notification: NzNotificationService,
    ) {
        this.updates.available.subscribe(event => {
            this.showAppUpdateAlert();
        });
    }

    showAppUpdateAlert() {
        const header = 'App Update available';
        const message = 'Choose Ok to update';
        const action = this.doAppUpdate;
        this.confirmModal = this.modal.confirm({
            nzTitle: header,
            nzContent: message,
            nzOnOk: action
        });
    }

    doAppUpdate() {
        this.updates.activateUpdate()
            .then(() => document.location.reload())
            .catch(() => this.showUpdateError())
    }

    showUpdateError() {
        this.notification.create(
            'error',
            'Não foi possivel atualizar o app',
            ''
        );
    }

}