
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
    template: ''
})
export abstract class ComponentBase implements OnInit, OnDestroy {
    currentUser!: User | null;
    constructor() {
    }

    ngOnInit() {
        this.onInit();
    }

    ngOnDestroy(): void {
        this.onDestroy();
    }

    protected abstract onInit(): void;
    protected abstract onDestroy(): void;
    protected abstract getCurrentUser(): void;


}
