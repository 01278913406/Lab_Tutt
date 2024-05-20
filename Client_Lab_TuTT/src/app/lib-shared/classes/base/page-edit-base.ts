import { ComponentBase } from './component-base';
import { Output, EventEmitter, OnDestroy, Injector, Component } from '@angular/core';

@Component({
    template: ''
})
export abstract class PageEditBase extends ComponentBase {
    isShow = false;
    submitting = false;

    @Output() closePopup = new EventEmitter<any>();

    constructor(protected _injector: Injector) {
        super();
    }


}
