import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { LoaderService } from "../../shared/loader/loader.service";
import { tap } from "rxjs/internal/operators/tap";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ActivationEnd } from "@angular/router";
import { delay } from "rxjs/operators";

export const interceptorskipheader = "X-Skip-Interceptor";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(private loaderService: LoaderService, private readonly router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.router.events.subscribe(event => {
            if (event instanceof ActivationEnd) {
                this.removeRequest(req);
            }
        });

        if (req.headers.has(interceptorskipheader)) {
            const headers = req.headers.delete(interceptorskipheader);
            return next.handle(req.clone({ headers }));
        }

        return new Observable(observer => {
            const subscription = next.handle(req).pipe(
                delay(0),
                tap(() => {
                    this.requests.push(req);
                    if (!req.headers.get("skip")) {
                    this.showLoader();
                }
                })
            ).subscribe(
                event => {
                    if (event instanceof HttpResponse) {
                        this.removeRequest(req);
                        observer.next(event);
                    }
                },
                error => {
                    this.removeRequest(req); observer.error(error);
                },
                () => { this.removeRequest(req); observer.complete(); }
            );
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private removeRequest(req: HttpRequest<any>): void {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        if (this.requests.length === 0) {
            this.loaderService.hide();
        }
    }
}

