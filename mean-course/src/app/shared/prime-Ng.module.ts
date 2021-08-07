import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
    imports: [],
    exports: [
        ButtonModule,
        CardModule,
        InputTextModule,
        PanelMenuModule,
        MessagesModule,
        MessageModule,
        CarouselModule,
        GalleriaModule,
        ToastModule,
        ToolbarModule,
        AccordionModule,
        MenubarModule,
        ProgressSpinnerModule
    ],
    declarations: []
})
export class PrimeNgModule { }