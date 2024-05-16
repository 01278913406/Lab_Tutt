import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BaseService } from '../../lib-shared/services/base.service';


@Injectable()
export class UsersService extends BaseService {
    constructor(http: HttpClient, injector: Injector) {
        super(http, injector, `${environment.apiDomain.LABTuttEndPoint}/User`);
    }
    // lấy tất cả danh sách người dùng
    GetsAllUsers() {
        const queryString = `${this.serviceUri}`;
        return this.defaultGet(queryString);
    }
    //Kiểm tra thông tin đăng nhập người dùng
    Login(itemUser: any) {
        const queryString = `${this.serviceUri}/login`;
        return this.defaultPost(queryString, itemUser);
    }

}