import {
    HttpInterceptor, HttpHeaderResponse, HttpUserEvent,
    HttpProgressEvent, HttpHandler, HttpSentEvent,
    HttpRequest,
    HttpResponse,
    HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthorizationIntercepter implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent
        | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<any>> {
        let accessToken: any;
        const userKey = localStorage.getItem(environment.caches.USER_KEY);
        if (userKey) {
            accessToken = JSON.parse(userKey);
        }
        if (accessToken?.token) {
            const header = 'Bearer ' + accessToken.token;
            const headers = req.headers.set('Authorization', header);
            req = req.clone({ headers });
        }
        return next.handle(req);
    }
}


