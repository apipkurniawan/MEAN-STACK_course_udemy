import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoDecimalPipe } from './pipes/no-decimal.pipe';
import { PrimeNgModule } from './prime-ng.module';
import '../core/array.prototype';

@NgModule({
    imports: [],
    exports: [
        PrimeNgModule,
        CommonModule,
        FormsModule,
        NoDecimalPipe,
        ReactiveFormsModule
    ],
    declarations: [
        NoDecimalPipe
    ]
})
export class SharedModule { }