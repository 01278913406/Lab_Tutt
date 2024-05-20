import { ComponentBase } from './component-base';
import { OnInit, Injector, ViewChild, ElementRef, HostListener, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

import { User } from '../../models/user';

@Component({
    template: ''
})
export abstract class SecondPageIndexBase {
    currentUser = new User;
    query = '';
    openSearchAdv = false;
    isCheckAll = false;
    isViewActivity = false;
    isViewSetting = false;
    ids = [];
    total = 0;
    page = 1;
    limit = 100;
    limitAll = 10000;
    cols = [];
    isMultiEdit = false;
    dataSource = [];
    dataExport = [];
    dataTotal = [];
    openSelectCheck = false;
    sortField = '';
    isAsc = false;
    isLoading = false;
    selectedItems = [];
    isCollapsed = false;
    isIgnoreClientCache = false;
    openColumnList = false;
    isViewList = true;
    arrTrangThai = [
        { label: 'Sử dụng', value: 1 },
        { label: 'Không Sử dụng', value: 2 },
        { label: '--Tất cả--', value: 0 },
    ];
    trangThai = 1;
    listItemNumberPerPage = [
        { label: '20', value: 20 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
        { label: '200', value: 200 },
        { label: '500', value: 500 },
        { label: '1000', value: 1000 },
    ];

}
