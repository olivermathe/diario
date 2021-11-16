import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {

    confirmModal?: NzModalRef;

    constructor(private readonly updates: SwUpdate, private readonly modal: NzModalService) {
        this.updates.available.subscribe(event => {
            this.showAppUpdateAlert();
        });
    }

    showAppUpdateAlert() {
        const header = 'App Update available';
        const message = 'Choose Ok to update';
        const action = this.doAppUpdate;
        const caller = this;
        this.confirmModal = this.modal.confirm({
            nzTitle: header,
            nzContent: message,
            nzOnOk: action
        });
    }

    doAppUpdate() {
        this.updates.activateUpdate().then(() => document.location.reload());
    }

}