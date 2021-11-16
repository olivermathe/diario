import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {

    minute = 60000;

    confirmModal?: NzModalRef;

    constructor(
        private readonly updates: SwUpdate,
        private readonly modal: NzModalService,
        private readonly notification: NzNotificationService,
    ) {}

    start() {
        this.checkForUpdate();
        timer(this.minute).subscribe(() => this.checkForUpdate())
    }

    checkForUpdate() {
        this.updates.available.subscribe(() => this.showAppUpdateAlert());
    }

    showAppUpdateAlert() {
        const header = 'Atualização disponível';
        const message = 'Deseja atualizar agora?';
        this.confirmModal = this.modal.confirm({
            nzTitle: header,
            nzContent: message,
            nzOnOk: () => new Promise(resolve => {
                this.doAppUpdate();
                return resolve();
            })
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