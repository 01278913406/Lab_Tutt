import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../lib-shared/services/base.service';
import moment from 'moment';

/**
 * Service xử lý bảng dữ liệu người dùng
 * tutt2 5/16/2024 created
 */
@Injectable()
export class UsersService extends BaseService {
    constructor(
        http: HttpClient, 
        injector: Injector, 
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        super(http, injector, `${environment.apiDomain.LABTuttEndPoint}/User`);
    }
    // lấy tất cả danh sách người dùng
    GetUsersClient(key: string, gender: string, fromDate: Date, toDate: Date, page: number, pageSize: number) {
        let fDate = "";
        if (fromDate) {
            fDate = moment(fromDate).format('YYYY-MM-DD')
        }
        let tDate = "";
        if (toDate) {
            tDate = moment(toDate).format('YYYY-MM-DD');
        }
        const queryString = `${this.serviceUri}?key=${key}&gender=${gender}&fromDate=${fDate}&toDate=${tDate}&page=${page}&pageSize=${pageSize}`;
        console.log("endpoint: ", queryString);
        return this.defaultGet(queryString);
    }

    

    /**
     * Deletes user by id
     * @param id 
     * @returns  
     */
    DeleteUserById(id: number) {
        const queryString = `${this.serviceUri}/DeleteUserById/${id}`;
        return this.defaultDelete(queryString);
    }

   
    DeleteMultiUser(item: any) {
        const queryString = `${this.serviceUri}/DeleteMultiUser`;
        return this.defaultPost(queryString,item);
    }

    UpdateUser(item: any) {
        const queryString = `${this.serviceUri}/UpdateUser`;
        return this.defaultPost(queryString, item);
    }

    SaveUser(item: any) {
        const queryString = `${this.serviceUri}/SaveUser`;
        return this.defaultPost(queryString, item);
    }
}