<div class="container-fluid">
    <div class="row">
        <div class="col-md-3 col-xl-2">
            <nav class="sticky-top mt-4">
                <ul class="nav flex-column">
                    <li class="nav-item" *ngFor="let n of nav">
                        <a class="nav-link" href="#{{n.id}}">{{n.title}}</a>
                        <ul class="nav flex-column">
                            <li class="nav-item" *ngFor="let s of n.children">
                                <a class="nav-link" href="#{{s.id}}">{{s.title}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="col-md-9 col-xl-10 mb-5">
            <section id="overview">
                <h1 class="page-header">Overview</h1>
                <p>
                    This Angular plugin adds <code>datepicker</code> and <code>timepicker</code> components.<br/>
                    Both of them are highly customizable with a set of available options. See examples below to discover
                    all of them!
                </p>
            </section>
            <section id="datepicker">
                <h1 class="page-header">Datepicker examples</h1>
                <section id="default-datepicker">
                    <h2 class="page-header">Default datepicker</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>
                                <a href="javascript:" (click)="isDisabled=!isDisabled">Trigger 'disabled'</a>
                            </label>
                            <datepicker [(ngModel)]="date" [disabled]="isDisabled"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="date" [disabled]="isDisabled"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                </section>
                <section id="min-date_max-date">
                    <h2 class="page-header">Min and max date limiting</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>
                                With min-date set to first datepicker value
                            </label>
                            <datepicker [formControl]="minDateControl" [minDate]="date"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [formControl]="minDateControl" [minDate]="date"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>
                                With max-date set to second datepicker value
                            </label>
                            <datepicker [formControl]="maxDateControl" [maxDate]="minDateControl.value"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [formControl]="maxDateControl"
                            [maxDate]="minDateControl.value"&gt;&lt;/datepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="validator">
                    <h2 class="page-header">Builtin validator</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>
                                Invalid date
                            </label>
                            <datepicker [(ngModel)]="invalidDate"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="invalidDate"&gt;&lt;/datepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="sizing">
                    <h2 class="page-header">Sizing</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Size small</label>
                            <datepicker [(ngModel)]="date" size="sm"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="date" size="sm"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Size large</label>
                            <datepicker [(ngModel)]="date" size="lg"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="date" size="lg"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                </section>
                <section id="without-icon">
                    <h2 class="page-header">Without icon</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="date" [showIcon]="false"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="date" [showIcon]="false"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                </section>
                <section id="hide-on-pick">
                    <h2 class="page-header">Hide on date pick</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="date" [hideOnPick]="true"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="date" [hideOnPick]="true"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                </section>
                <section id="disabled-dates">
                    <h2 class="page-header">Disable dates</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="date" [disabledDates]="disabledDates"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="date" [disabledDates]="disabledDates"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                    <p>
                        <code>[disabledDates]</code> input accepts a callback with signature
                        <code>disabledDates(date: DateExtended, mode: 'year' | 'month' | 'day'): boolean</code><br/>
                        <code>mode</code> represents current calendar view-mode
                        (user can change it by clicking on current month name or year in calendar header)<br/>
                        Function should return true for available dates, and false for disabled dates.
                    </p>
                </section>
                <section id="week-picker">
                    <h2 class="page-header">Week picker</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="week" [weekPicker]="true"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="week" [weekPicker]="true"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                </section>
                <section id="week-picker-disabled-dates">
                    <h2 class="page-header">Week picker with disabled dates</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="week" [weekPicker]="true"
                                        [disabledDates]="disabledDates"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="week" [weekPicker]="true" [disabledDates]="disabledDates"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                </section>
                <section id="month-picker">
                    <h2 class="page-header">Month picker</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="month" [monthPicker]="true"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="month" [monthPicker]="true"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                </section>
                <section id="display-formatter">
                    <h2 class="page-header">Custom display value</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="displayFormatterValue" [displayFormatter]="displayFormatter"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="displayFormatterValue"
                            [displayFormatter]="displayFormatter"&gt;&lt;/datepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="format">
                    <h2 class="page-header">Custom model or input format</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Custom input format</label>
                            <datepicker [(ngModel)]="dateFormat" format="j F Y"></datepicker>
                            <pre class="mb-0 mt-2">model value: {{dateFormat}}</pre>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="dateFormat" format="j F Y"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Custom model format</label>
                            <datepicker [(ngModel)]="dateFormatModel" modelFormat="j F Y"></datepicker>
                            <pre class="mb-0 mt-2">model value: {{dateFormatModel}}</pre>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="dateFormatModel" modelFormat="j F Y"&gt;&lt;/datepicker&gt;</code-example>
                    </div>
                    <p>
                        View or model formatting utilizes
                        <a target="_blank" href="https://mateuszrohde.pl/repository/date-extensions">DateExtended</a>
                        &nbsp;<code>createFromFormat</code> and <code>format</code> functions.<br/>
                        Format string should be the same as accepted by
                        <a href="https://www.php.net/manual/en/datetime.format.php" target="_blank">PHP
                            DateTimeInterface::format()</a>.
                    </p>
                </section>
                <section id="placeholder">
                    <h2 class="page-header">Placeholder</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <datepicker [(ngModel)]="placeholder" placeholder="Placeholder text"></datepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker [(ngModel)]="placeholder" placeholder="Placeholder
                            text"&gt;&lt;/datepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="input-group">
                    <h2 class="page-header">Custom input group</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <div class="input-group flex-nowrap">
                                <span class="input-group-prepend">
                                    <button class="btn btn-outline-secondary">Custom</button>
                                </span>
                                <datepicker [(ngModel)]="date"></datepicker>
                                <div class="input-group-append">
                                    <span class="input-group-text">Custom</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <label>Code:</label>
                            <pre class="card card-body bg-light">&lt;div class="input-group flex-nowrap"&gt;
    &lt;span class="input-group-prepend"&gt;
        &lt;button class="btn btn-outline-secondary"&gt;Custom&lt;/button&gt;
    &lt;/span&gt;
    &lt;datepicker [(ngModel)]="date"&gt;&lt;/datepicker&gt;
    &lt;div class="input-group-append"&gt;
        &lt;span class="input-group-text"&gt;Custom&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
                        </div>
                    </div>
                </section>
                <section id="calendar-only">
                    <h2 class="page-header">Calendar only</h2>
                    <div class="row">
                        <div class="form-group col-sm-4 d-flex justify-content-center">
                            <datepicker-calendar [(ngModel)]="date"></datepicker-calendar>
                        </div>
                        <code-example class="col-sm-8">&lt;datepicker-calendar [(ngModel)]="date" name="calendar"&gt;&lt;/datepicker-calendar&gt;</code-example>
                    </div>
                </section>
            </section>
            <section id="timepicker">
                <h4 class="page-header">Timepicker examples</h4>
                <section id="default-timepicker">
                    <h2 class="page-header">Default timepicker</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <timepicker [(ngModel)]="time"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="time"&gt;&lt;/timepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="date-parts">
                    <h2 class="page-header">Disable time parts</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Without hours</label>
                            <timepicker [(ngModel)]="minutesSeconds" [pickHours]="false"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="minutesSeconds" [pickHours]="false"&gt;&lt;/timepicker&gt;</code-example>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Only seconds</label>
                            <timepicker [(ngModel)]="seconds" [pickHours]="false" [pickMinutes]="false"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="seconds" [pickHours]="false"
                            [pickMinutes]="false"&gt;&lt;/timepicker&gt;
                        </code-example>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Only hours and minutes</label>
                            <timepicker [(ngModel)]="hoursMinutes" [pickSeconds]="false"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="hoursMinutes" [pickSeconds]="false"&gt;&lt;/timepicker&gt;</code-example>
                    </div>
                </section>
                <section id="timepicker-sizing">
                    <h2 class="page-header">Sizing</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Size small</label>
                            <timepicker [(ngModel)]="time" size="sm"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="time" size="sm"&gt;&lt;/timepicker&gt;
                        </code-example>
                    </div>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Size large</label>
                            <timepicker [(ngModel)]="time" size="lg"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="time" size="lg"&gt;&lt;/timepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="timepicker-without-icon">
                    <h2 class="page-header">Without icon</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <timepicker [(ngModel)]="time" [showIcon]="false"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="time" [showIcon]="false"&gt;&lt;/timepicker&gt;</code-example>
                    </div>
                </section>
                <section id="timepicker-hide-on-pick">
                    <h2 class="page-header">Hide on pick</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <timepicker [(ngModel)]="time" [hideOnPick]="true"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="time" [hideOnPick]="true"&gt;&lt;/timepicker&gt;</code-example>
                    </div>
                </section>
                <section id="timepicker-validator">
                    <h2 class="page-header">Builtin validator</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>Invalid format</label>
                            <timepicker [(ngModel)]="invalidTime"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="invalidTime"&gt;&lt;/timepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="timepicker-placeholder">
                    <h2 class="page-header">Placeholder</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <timepicker [(ngModel)]="timePlaceholder" placeholder="Placeholder text"></timepicker>
                        </div>
                        <code-example class="col-sm-8">&lt;timepicker [(ngModel)]="timePlaceholder"
                            placeholder="Placeholder text"&gt;&lt;/timepicker&gt;
                        </code-example>
                    </div>
                </section>
                <section id="timepicker-input-group">
                    <h2 class="page-header">Custom input-group</h2>
                    <div class="row">
                        <div class="form-group col-sm-4">
                            <label>&nbsp;</label>
                            <div class="input-group flex-nowrap">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary">Custom</button>
                                </div>
                                <timepicker [(ngModel)]="time"></timepicker>
                                <div class="input-group-append">
                                    <span class="input-group-text">Custom</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <label>Code:</label>
                            <pre class="card card-body bg-light">&lt;div class="input-group flex-nowrap"&gt;
    &lt;div class="input-group-prepend"&gt;
        &lt;button class="btn btn-outline-secondary"&gt;Custom&lt;/button&gt;
    &lt;/div&gt;
    &lt;timepicker [(ngModel)]="time"&gt;&lt;/timepicker&gt;
    &lt;div class="input-group-append"&gt;
        &lt;span class="input-group-text"&gt;Custom&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
                        </div>
                    </div>
                </section>
                <section id="picker-only">
                    <h2 class="page-header">Picker only</h2>
                    <div class="row">
                        <div class="form-group col-sm-4 d-flex justify-content-center">
                            <label>&nbsp;</label>
                            <time-selector [(ngModel)]="time"></time-selector>
                        </div>
                        <code-example class="col-sm-8">&lt;time-selector [(ngModel)]="time"&gt;&lt;/time-selector&gt;
                        </code-example>
                    </div>
                </section>
            </section>
            <div class="mb-3"></div>
        </div>
    </div>
</div>
