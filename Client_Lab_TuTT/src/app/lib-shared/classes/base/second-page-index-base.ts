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
    total = 0;
    page = 1;
    limit = 10;
    limitAll = 10000;
    dataSource: any[] = [];
    dataExport = [];
    dataTotal = [];
    listItemNumberPerPage = [
        { value: 10, display: '10' },
        { value: 20, display: '20' },
        { value: 50, display: '50' },
        { value: 100, display: '100' },
        { value: 200, display: '200' },
        { value: 500, display: '500' },
        { value: 1000, display: '1000' },
    ];

}
