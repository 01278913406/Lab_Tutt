import {
    HttpInterceptor, HttpHeaderResponse, HttpUserEvent,
    HttpProgressEvent, HttpHandler, HttpSentEvent,
    HttpRequest,
    HttpResponse,
    HttpEvent
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthorizationIntercepter implements HttpInterceptor {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent
        | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<any>> {
        let accessToken: any;
        if (isPlatformBrowser(this.platformId)) {
            const userKey = localStorage.getItem(environment.caches.USER_KEY);
            if (userKey) {
                accessToken = JSON.parse(userKey);
            }
        }
        if (accessToken?.token) {
            const header = 'Bearer ' + accessToken.token;
            const headers = req.headers.set('Authorization', header);
            req = req.clone({ headers });
        }
        return next.handle(req);
    }
}


