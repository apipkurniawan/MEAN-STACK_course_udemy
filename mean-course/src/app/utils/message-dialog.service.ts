import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class MessageDialogService {

    constructor(
        private messageService: MessageService,
    ) { }

    show(msg: string) {
        this.messageService.add({
            key: 'main-toast',
            summary: 'ERROR',
            severity: 'error',
            detail: `${msg}!`
        });
    }

}
