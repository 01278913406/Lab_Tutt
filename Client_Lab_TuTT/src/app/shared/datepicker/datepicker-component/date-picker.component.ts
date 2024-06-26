/*
 * Angular DatePicker & TimePicker plugin
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { DatePickerConfigService } from '../date-picker-config.service';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR, ValidationErrors,
    Validator
} from '@angular/forms';
import { AbstractEnabledDates } from '../abstract-enabled-dates';
import { Subscription } from 'rxjs';
import DateExtended from '../date-extended';

@Component({
    selector: 'datepicker',
    templateUrl: './date-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DatePickerComponent
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: DatePickerComponent
        }
    ],
    host: { ngSkipHydration: 'true' },
})
export class DatePickerComponent extends AbstractEnabledDates implements ControlValueAccessor, OnDestroy, Validator {
    @Input() format: string;
    @Input() modelFormat: string;
    @Input() inputFormatter?: (input: string) => string;
    @Input() displayFormatter?: (date: DateExtended) => string;
    @Input() placeholder?: string;
    @Input() showIcon: boolean;
    @Input() hideOnPick: boolean;
    @Input() weekPicker = false;
    @Input() monthPicker = false;
    @Input() size?: 'sm' | 'lg';
    @Input() disabledDates?: (date: DateExtended, mode: 'year' | 'month' | 'day') => boolean;

    @Input() set minDate(date: string | Date | undefined) {
        this._minDate = this.unknownToDate(date);
    }

    @Input() set maxDate(date: string | Date | undefined) {
        this._maxDate = this.unknownToDate(date);
    }

    isOpen = false;
    isDisabled = false;
    calendarControl = new FormControl();
    inputControl = new FormControl();
    displayValue = '';

    private _onChange?: (value: unknown) => void;
    private _onTouched?: () => void;
    private _wasTouched = false;
    private subscriptions: Subscription[] = [];

    @HostListener('document:click', ['$event.target']) click(target: HTMLElement): void {
        if (this.isOpen && !this.elementRef.nativeElement.contains(target)) {
            this.isOpen = false;
        }
    }

    constructor(
        private cd: ChangeDetectorRef,
        private config: DatePickerConfigService,
        private elementRef: ElementRef<HTMLElement>
    ) {
        super();
        this.format = this.config.format;
        this.modelFormat = this.config.modelFormat;
        this.inputFormatter = this.config.inputFormatter;
        this.showIcon = this.config.showIcon;
        this.hideOnPick = this.config.hideOnPick;

        // view to model change listeners
        const updateModel = (value: unknown): void => {
            if (this._onChange) {
                this._onChange(value);
                if (this.inputControl.touched || this.calendarControl.touched) {
                    this.markAsTouched();
                }
            }
        }
        // from calendar
        this.subscriptions.push(this.calendarControl.valueChanges.subscribe((value: string): void => {
            this.inputControl.setValue(
                this.convertDate(value, this.modelFormat, this.format), { emitEvent: false }
            );
            updateModel(value);
            if (this.hideOnPick) {
                this.isOpen = false;
            }
            if (this.displayFormatter) {
                const date = this.unknownToDate(value, this.modelFormat);
                if (date instanceof DateExtended && date.isValid()) {
                    this.displayValue = this.displayFormatter(date);
                }
            }
        }));
        // from input
        this.subscriptions.push(this.inputControl.valueChanges.subscribe((value: string): void => {
            if (typeof this.inputFormatter === 'function') {
                value = this.inputFormatter(value);
            }

            const formatted = this.convertDate(value, this.format, this.modelFormat, true);
            this.calendarControl.setValue(formatted, { emitEvent: false });
            updateModel(formatted);
        }));
    }

    writeValue(obj: unknown): void {
        this.calendarControl.setValue(obj, { emitEvent: false });
        this.inputControl.setValue(this.convertDate(obj, this.modelFormat, this.format), { emitEvent: false });

        if (this.displayFormatter) {
            const date = this.unknownToDate(obj, this.modelFormat);
            if (date instanceof DateExtended) {
                this.displayValue = this.displayFormatter(date);
            }
        }
    }

    registerOnChange(fn: (value: unknown) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
        if (isDisabled) {
            this.inputControl.disable();
        } else {
            this.inputControl.enable();
        }
    }

    markAsTouched(): void {
        if (!this._wasTouched && this._onTouched) {
            this._wasTouched = true;
            this._onTouched();
        }
    }

    validate(): ValidationErrors | null {
        if (this.inputControl.value === '' || typeof this.inputControl.value !== 'string') {
            return null;
        }

        let value = this.inputControl.value;

        if (typeof this.inputFormatter === 'function') {
            value = this.inputFormatter(value);
        }

        const date = this.unknownToDate(value, this.format);
        let isValid = date instanceof DateExtended && date.isValid() && this.isEnabledDate(date, 'day');

        if (isValid && this.weekPicker) {
            isValid = date?.format('N') === '1';
        }

        return isValid ? null : {
            date: this.inputControl.value
        };
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    private convertDate(date: unknown, fromFormat: string, toFormat: string, forceValid = false): unknown {
        const converted = this.unknownToDate(date, fromFormat);
        if (converted && converted.isValid()) {
            return converted.format(toFormat);
        }

        return forceValid ? null : date;
    }
    async handleSelectDate(result: boolean): Promise<void> {
        if (result)
            this.isOpen = false;
    }
}
