import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../lib-shared/services/base.service';

/**
 * Service xử lý bảng dữ liệu người dùng
 * tutt2 5/16/2024 created
 */
@Injectable()
export class UsersService extends BaseService {
    constructor(http: HttpClient, injector: Injector, @Inject(PLATFORM_ID) private platformId: any) {
        super(http, injector, `${environment.apiDomain.LABTuttEndPoint}/User`);
    }
    // lấy tất cả danh sách người dùng
    GetUsersClient(key: string, gender: string, fromDate: Date, toDate: Date, page: number, pageSize: number) {
        const queryString = `${this.serviceUri}?key=${key}&gender=${gender}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${pageSize}`;
        console.log("endpoint: ", queryString);
        return this.defaultGet(queryString);
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

    DeleteUserById(id: number) {
        const queryString = `${this.serviceUri}/DeleteUserById/${id}`;
        return this.defaultDelete(queryString);
    }

}