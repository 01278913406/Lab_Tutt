import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

import { User } from '../models/user';
import { promises } from 'node:fs';
/**
 * Service lưu, lấy thông tin liên quan đến xác thực người dùng
 * tutt2 5/17/2024 created
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly USER_KEY = 'cachedUser';
    private readonly EXPIRATION_KEY = 'cachedUserExpiration';
    constructor(@Inject(PLATFORM_ID) private platformId: any) { }

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
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
            localStorage.setItem(this.EXPIRATION_KEY, expirationTime.toString());
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
            const expirationTime = parseInt(localStorage.getItem(this.EXPIRATION_KEY) || '0', 10);

            //kiểm tra thời gian lưu thông tin người dùng 
            //nếu quá thời gian thì xóa thông tin người dùng bắt đăng nhập lại
            if (now > expirationTime) {
                this.removeUser();
                return null;
            }

            //lấy thông tin token key đã lưu trong localStorage
            const user = localStorage.getItem(this.USER_KEY);
            if (user) {
                const accessToken = JSON.parse(user);
                //decode chuỗi token
                const claims: any = jwtDecode(accessToken.token);
                if (claims) {
                    crrUser.username = claims.sub;
                    crrUser.fullName = claims.name;
                    crrUser.email = claims.name;
                }
            }
        }
        return crrUser;
    }

    //xóa thông tin token key đã lưu nếu quá thời gian
    //yêu cầu đăng nhập lại
    removeUser(): void {
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.EXPIRATION_KEY);
    }


}