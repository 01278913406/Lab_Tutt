import { Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ResponseResult } from '../models/response-result';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { retry } from 'rxjs/internal/operators/retry';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

/**
 * Service cơ bản để kết nối dịch vụ api backend
 * post, get, delete, detail, put
 * tutt 15/05/2024 create
 */
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
        , serviceUri: string,
    ) {
        this._http = http;
        this._injector = injector;
        this.serviceUri = serviceUri;
    }

    /**
     * Gets detail
     * @param id 
     * @returns detail 
     * tutt2 5/17/2024 created
     */
    getDetail(id: any): Promise<ResponseResult | undefined> {
        const url = `${this.serviceUri}/${id}`;
        return this.defaultGet(url);
    }

    /**
     * Posts base service
     * @param item 
     * @returns object ResponseResult | null 
     * tutt2 5/17/2024 created
     */
    post(item: any): Promise<ResponseResult | undefined> {
        return this._http
            .post<ResponseResult>(this.serviceUri, item, this.headersOptions())
            .pipe(catchError(err => this.handleError(err, this._injector))).toPromise();
    }

    /**
     * Puts base service
     * @param id 
     * @param item 
     * @returns put 
     * tutt2 5/17/2024 created
     */
    put(id: string, item: any): Promise<ResponseResult | undefined> {
        const url = `${this.serviceUri}/${id}`;

        return this._http
            .put<ResponseResult>(url, item, this.headersOptions()).toPromise();
    }

    /**
     * Deletes base service
     * @param id 
     * @returns delete 
     * tutt2 5/17/2024 created
     */
    delete(id: number): Promise<ResponseResult | undefined> {
        const url = `${this.serviceUri}/${id}`;
        return this._http
            .delete<ResponseResult>(url, this.headersOptions())
            .pipe(retry(this.RETRY_COUNT)).toPromise();
    }

    /**
     * Deletes many
     * @param lstId 
     * @returns many
     * tutt2 5/17/2024 created 
     */
    deleteMany(apiUrl: string, item: any): Promise<ResponseResult | undefined> {
        return this._http
            .delete<ResponseResult>(apiUrl)
            .pipe(retry(this.RETRY_COUNT)).toPromise();
    }

    /**
     * Defaults get
     * @param apiUrl 
     * @returns get
     * tutt2 5/17/2024 created 
     */
    defaultGet(apiUrl: string): Promise<ResponseResult | undefined> {
        return this._http.get<ResponseResult>(apiUrl, this.headersOptions())
            .pipe(
                shareReplay(this.REPLAY_COUNT),
                retry(this.RETRY_COUNT)
            ).toPromise();
    }
    /**
     * Defaults post
     * @param apiUrl 
     * @param item 
     * @returns post
     * tutt2 5/17/2024 created 
     */
    defaultPost(apiUrl: string, item: any): Promise<ResponseResult | undefined> {
        return this._http
            .post<ResponseResult>(apiUrl, item, this.headersOptions())
            .pipe(catchError(err => this.handleError(err, this._injector))).toPromise();
    }
    /**
     * Defaults delete
     * @param apiUrl 
     * @returns delete
     * tutt2 5/17/2024 created 
     */
    defaultDelete(apiUrl: string): Promise<ResponseResult | undefined> {
        return this._http
            .delete<ResponseResult>(apiUrl)
            .pipe(retry(this.RETRY_COUNT)).toPromise();
    }

    /**
     * Gets ignore client cache
     * @param apiUrl 
     * @returns ignore client cache 
     * tutt2 5/17/2024 created
     */
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
    /**
     * Handles error
     * @param error 
     * @param injector 
     * @returns  
     * tutt2 5/17/2024 created
     */
    handleError(error: any, injector: Injector) {
        if (error.status === 401 || error.status == 403) {
            error.message = `Bạn không có quyền truy cập (${error.status})`;
        } else {
            error.message = `${error.message} (${error.status})`;
        }
        return Promise.reject(error);
    }
    /**
     * Headers options
     * @returns  
     * tutt2 5/17/2024 created
     */
    headersOptions() {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
        };
       
        // let strAccessToken:any;
        // const user = localStorage.getItem(environment.caches.USER_KEY);
        // if (user) {
        //     strAccessToken = JSON.parse(user);
        // }
        // if (strAccessToken) {
        //     httpOptions = {
        //         headers: new HttpHeaders({
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*',
        //             'Authorization': `Bearer ${strAccessToken.token}`
        //         })
        //     };
        // }
        return httpOptions;
    }
}