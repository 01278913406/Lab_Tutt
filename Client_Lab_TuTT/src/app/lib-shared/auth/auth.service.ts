import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

import { User } from '../models/user';
import { promises } from 'node:fs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseService } from '../services/base.service';
/**
 * Service lưu, lấy thông tin liên quan đến xác thực người dùng
 * tutt2 5/17/2024 created
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
    // private readonly USER_KEY = 'cachedUser';
    // private readonly EXPIRATION_KEY = 'cachedUserExpiration';
    // constructor(@Inject(PLATFORM_ID) private platformId: any) { }
    constructor(http: HttpClient, injector: Injector, @Inject(PLATFORM_ID) private platformId: any) {
        super(http, injector, `${environment.apiDomain.LABTuttEndPoint}/Auth`);
    }
    /**
     * lấy thông tin người dùng đã đăng nhập
     * Params auth service
     * @param object user 
     * @param [expirationInMinutes] - thời gian lưu chuỗi tokenkey 
     * tutt2 5/17/2024 created
     */
    saveAccessToken(user: any, expirationInMinutes: number = 30): void {
        if (isPlatformBrowser(this.platformId)) {
            const now = new Date().getTime();
            const expirationTime = now + expirationInMinutes * 60 * 1000; // Convert minutes to milliseconds
            localStorage.setItem(environment.caches.USER_KEY, JSON.stringify(user));
            localStorage.setItem(environment.caches.EXPIRATION_KEY, expirationTime.toString());
        }
    }

    /**
     * lấy thông tin người dùng đã đăng nhập
     * @returns object User
     * tutt2 5/17/2024 created
     */
    async getCurrentUser(): Promise<User | null> {
        const crrUser = new User();
        if (isPlatformBrowser(this.platformId)) {
            const now = new Date().getTime();
            const expirationTime = parseInt(localStorage.getItem(environment.caches.EXPIRATION_KEY) || '0', 10);

            //kiểm tra thời gian lưu thông tin người dùng 
            //nếu quá thời gian thì xóa thông tin người dùng bắt đăng nhập lại
            if (now > expirationTime) {
                this.removeUser();
                return null;
            }

            //lấy thông tin token key đã lưu trong localStorage
            const user = localStorage.getItem(environment.caches.USER_KEY);
            if (user) {
                const accessToken = JSON.parse(user);
                //decode chuỗi token
                const claims: any = jwtDecode(accessToken.token);
                if (claims) {
                    crrUser.username = claims.unique_name;
                    crrUser.fullName = claims.given_name;
                    crrUser.email = claims.email;
                    crrUser.gender = claims.gender;
                }
            }
        }
        return crrUser;
    }

    async getAccessToken(): Promise<string | null> {
        let strAccessToken = '';
        if (isPlatformBrowser(this.platformId)) {
            const user = localStorage.getItem(environment.caches.USER_KEY);
            if (user) {
                 strAccessToken = JSON.parse(user);
            }
        }
        return strAccessToken;
    }

    //xóa thông tin token key đã lưu nếu quá thời gian
    //yêu cầu đăng nhập lại
    removeUser(): void {
        localStorage.removeItem(environment.caches.USER_KEY);
        localStorage.removeItem(environment.caches.EXPIRATION_KEY);
    }
    /**
         * Kiểm tra thông tin đăng nhập người dùng
         * @param itemUser 
         * @returns  
         * tutt2 5/16/2024 created
         */
    Login(itemUser: any) {
        const queryString = `${this.serviceUri}/login`;
        return this.defaultPost(queryString, itemUser);
    }

}