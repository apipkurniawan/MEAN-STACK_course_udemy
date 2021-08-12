import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                let errorMessage = 'An unknown error occurred!';
                if (error.error.message) {
                    errorMessage = error.error.message;
                }
                console.log(errorMessage);
                alert(errorMessage)
                return throwError(error);
            })
        );
    }
}
