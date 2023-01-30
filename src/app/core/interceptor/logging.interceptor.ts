import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor(
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {

          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            console.error(error);
          }
        }
      )
    );
  }
}
