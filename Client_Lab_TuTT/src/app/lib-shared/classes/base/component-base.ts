import { Subject } from 'rxjs/internal/Subject';
import { Component, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    template: ''
})
export abstract class ComponentBase implements OnDestroy {

    public _unsubscribeAll: Subject<any>;

    constructor() {
        this._unsubscribeAll = new Subject();
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
    }




}
