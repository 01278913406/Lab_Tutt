import { ComponentBase } from './component-base';
import { Injector, ViewChild, ElementRef, HostListener, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: ''
})
export abstract class PageIndexBase extends ComponentBase {

    query = '';
    openSearchAdv = false;
    isCheckAll = false;
    isViewActivity = false;
    isViewSetting = false;
    ids = [];
    total = 0;
    page = 1;
    limit = 10;
    limitAll = 10000;
    cols = [];
    isMultiEdit = false;
    dataSource = [];
    openSelectCheck = false;
    sortField = '';
    orderType = 1;
    isLoading = false;
    selectedItems = [];
    isAsc = true;
    listCountItemPage = [
        { label: '10', value: 10 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
    ];

    constructor(
        protected _injector: Injector
    ) {
        super();

    }

    toggleSearch() {
        this.openSearchAdv = !this.openSearchAdv;
    }

    toggleSelectCheck(): void {
        this.openSelectCheck = !this.openSelectCheck;
    }

    getData() {
        throw new Error('Method not implemented.');
    }

    onSearch(): void {
        this.page = 1;
        this.getData();
        // this.openSearchAdv = false;
    }

    goToPage(event: any): void {
        this.page = (event.first / event.rows) + 1;
        this.limit = event.rows;
        this.getData();
    }

    onNext(): void {
        this.page++;
        this.getData();
    }

    onPrev(): void {
        this.page--;
        this.getData();
    }

    onSort(event: any) {
        this.sortField = event.field;
        this.orderType = event.order;
        this.isAsc = event.order === 1 ? true : false;
        this.getData();
    }

    onChangeSize(n: number): void {
        if (n <= 0) {
            n = 5;
        }
        this.limit = n;
        this.page = 1;
        this.getData();
    }

    viewActivities(): void {
        this.isViewActivity = !this.isViewActivity;
    }

    viewSettings(): void {
        this.isViewSetting = !this.isViewSetting;
    }

    onPage(event: any): void {
        this.page = (event.first / event.rows) + 1;
        this.limit = event.rows;
        this.getData();
    }

}
