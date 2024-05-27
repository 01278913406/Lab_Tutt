import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

import { User } from '../models/user';
import { promises } from 'node:fs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseService } from '../services/base.service';
import moment from 'moment';
/**
 * Service lưu, lấy thông tin liên quan đến xác thực người dùng
 * tutt2 5/17/2024 created
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseService {
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
    saveAccessToken(user: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(environment.caches.USER_KEY, JSON.stringify(user));
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
            const now =  moment().unix();
            //lấy thông tin token key đã lưu trong localStorage
            const user = localStorage.getItem(environment.caches.USER_KEY);
            // console.log("user", user)
            if (user) {
                const accessToken = JSON.parse(user);
                //decode chuỗi token
                const claims: any = jwtDecode(accessToken.token);
                if (claims) {
                    if (now > claims.exp) {
                            this.removeUser();
                            return null;
                    }
                    crrUser.username = claims.unique_name;
                    crrUser.fullName = claims.given_name;
                    crrUser.email = claims.email;
                    crrUser.gender = claims.gender;
                }
            }
            else {
                return null;
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
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(environment.caches.USER_KEY);
            // localStorage.removeItem(environment.caches.EXPIRATION_KEY);
        }
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