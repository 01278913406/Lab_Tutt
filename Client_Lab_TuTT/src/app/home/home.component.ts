import { Component, OnInit } from '@angular/core';
import DateExtended from '../shared/datepicker/date-extended';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

  isDisabled = false;
  date = (new DateExtended()).format('Y-m-d');
  minDateControl = new FormControl((new DateExtended()).format('Y-m-d'));
  maxDateControl = new FormControl((new DateExtended()).format('Y-m-d'));
  invalidDate = 'not a date';

  disabledDates(date: DateExtended, mode: 'year' | 'month' | 'day'): boolean {
    if (mode === 'day') {
      return parseInt(date.format('N')) < 6;
    }
    return true;
  }

  week = '';
  month = '';
  displayFormatterValue = '';
  displayFormatter = (date: DateExtended): string => {
    if (!date.isValid()) {
      return '-';
    }

    return `${date.format('d/m/Y')}`;
  };
  dateFormat = (new DateExtended()).add(1).format('Y-m-d');
  dateFormatModel = (new DateExtended()).add(1).format('j F Y');
  placeholder = '';

  time = '23:59:59';
  minutesSeconds = '59:59';
  seconds = '59';
  hoursMinutes = '23:59';
  invalidTime = 'invalid time';
  timePlaceholder = '';
}
