import { Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseResult } from '../models/response-result';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';

export abstract class BaseService {
    _http: HttpClient;
    _injector: Injector;

    serviceUri = '';

    readonly RETRY_COUNT: number = 0;
    readonly REPLAY_COUNT: number = 1;
    readonly LIMIT_DEFAULT: number = 1000;

    constructor(
        http: HttpClient
        , injector: Injector
        , serviceUri: string
    ) {
        this._http = http;
        this._injector = injector;
        this.serviceUri = serviceUri;
    }

    getDetail(id: any): Promise<ResponseResult | undefined> {
        const url = `${this.serviceUri}/${id}`;
        return this.defaultGet(url);
    }

    post(item: any): Promise<ResponseResult | undefined> {
        return this._http
            .post<ResponseResult>(this.serviceUri, item, this.headersOptions())
            .pipe(catchError(err => this.handleError(err, this._injector))).toPromise();
    }

    put(id: string, item: any): Promise<ResponseResult | undefined> {
        const url = `${this.serviceUri}/${id}`;

        return this._http
            .put<ResponseResult>(url, item, this.headersOptions()).toPromise();
    }

    delete(id: number): Promise<ResponseResult | undefined> {
        const url = `${this.serviceUri}/${id}`;
        return this._http
            .delete<ResponseResult>(url, this.headersOptions())
            .pipe(retry(this.RETRY_COUNT)).toPromise();
    }

    deleteMany(lstId: string): Promise<ResponseResult | undefined> {
        const url = `${this.serviceUri}/DeleteMany/${lstId}`;
        return this._http
            .delete<ResponseResult>(url, this.headersOptions())
            .pipe(retry(this.RETRY_COUNT)).toPromise();
    }

    defaultGet(apiUrl: string): Promise<ResponseResult | undefined> {
        return this._http.get<ResponseResult>(apiUrl, this.headersOptions())
            .pipe(
                shareReplay(this.REPLAY_COUNT),
                retry(this.RETRY_COUNT)
            ).toPromise();
    }
    defaultPost(apiUrl: string, item: any): Promise<ResponseResult | undefined> {
        return this._http
            .post<ResponseResult>(apiUrl, item, this.headersOptions())
            .pipe(catchError(err => this.handleError(err, this._injector))).toPromise();
    }
    defaultDelete(apiUrl: string): Promise<ResponseResult | undefined> {
        return this._http
            .delete<ResponseResult>(apiUrl)
            .pipe(retry(this.RETRY_COUNT)).toPromise();
    }


    getIgnoreClientCache(apiUrl: string): Promise<ResponseResult | undefined> {

        const options = {
            headers: new HttpHeaders({ 'Cache-Control': 'no-cache' }),
        };

        return this._http.get<ResponseResult>(apiUrl, options)
            .pipe(
                shareReplay(this.REPLAY_COUNT),
                retry(this.RETRY_COUNT),
                catchError((err: HttpErrorResponse) => this.handleError(err, this._injector))
            ).toPromise();
    }

    handleError(error: any, injector: Injector) {
        if (error.status === 401 || error.status == 403) {
            error.message = `Bạn không có quyền truy cập (${error.status})`;
        } else {
            error.message = `${error.message} (${error.status})`;
        }
        return Promise.reject(error);
    }
    headersOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
        return httpOptions;
    }
}