const locales: any = {
    'en-us': {
        monthNames: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'
        ],
        monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayShortNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    'vi-vn': {
        monthNames: [
            'Tháng một', 'Tháng hai', 'Tháng ba', 'Tháng bốn', 'Tháng năm', 'Tháng sáu', 'Tháng bảy', 'Tháng tám', 'Tháng chín', 'Tháng mười',
            'Tháng mười một', 'Tháng mười hai'
        ],
        monthShortNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10',
        'Tháng 11', 'Tháng 12'],
        dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
        dayShortNames: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
    }
};
let defaultLocale = 'vi-vn';

export interface DateExtendedLocale {
    monthNames: string[],
    monthShortNames: string[],
    dayNames: string[],
    dayShortNames: string[]
}

type DateInterval = 'day' | 'week' | 'month' | 'year' | 'hour' | 'minute' | 'second';

export default class DateExtended extends Date {
    private locale: string;

    constructor();
    constructor(value: number | string);
    constructor(
        value: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number
    );
    constructor(...params: unknown[]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super(...params);
        this.locale = defaultLocale;
    }

    /**
     * Add new locale
     */
    static addLocale(locale: string, data: DateExtendedLocale): void {
        locales[locale] = data;
    }

    static setDefaultLocale(locale: string): void {
        if (!(locale in locales)) {
            throw new Error(`Locale ${locale} was not defined!`);
        }
        defaultLocale = locale;
    }

    static getDefaultLocale(): string {
        return defaultLocale;
    }

    static getMonthNames(locale: string): string[] {
        return _getLocaleData(locale, 'monthNames');
    }

    static getMonthShortNames(locale?: string): string[] {
        if (typeof locale === 'undefined') {
            locale = defaultLocale;
        }
        return _getLocaleData(locale, 'monthShortNames');
    }

    static getDayNames(locale: string): string[] {
        return _getLocaleData(locale, 'dayNames');
    }

    static getDayShortNames(locale?: string): string[] {
        if (typeof locale === 'undefined') {
            locale = defaultLocale;
        }
        return _getLocaleData(locale, 'dayShortNames');
    }

    setLocale(locale: string): this {
        if (!(locale in locales)) {
            throw new Error(`Locale ${locale} was not defined!`);
        }
        this.locale = locale;
        return this;
    }

    /**
     * Return current date locale
     */
    getLocale(): string {
        return this.locale;
    }

    static createFromDate(dateObject: Date): DateExtended {
        return new DateExtended(dateObject.getTime());
    }

    /**
     * Parses a date string according to a specified format
     *
     * @param format - The format that the passed in string should be in.
     * @param date - String representing the date
     */
    static createFromFormat(format: string, date: string): DateExtended {
        const result = new DateExtended();
        for (let i = 0; i < format.length; i++) {
            let match: any = null;
            switch (format[i]) {
                case 'd':
                case 'j':
                    match = date.match(
                        format[i] === 'd' ? /^[0-9]{2}/ : /^[0-9]{1,2}/
                    );
                    if (match !== null) {
                        match = match[0];
                        if (match > 0 && match < 32) {
                            result.setDate(parseInt(match));
                        } else {
                            match = null;
                        }
                    }
                    break;
                case 'F':
                case 'M': {
                    const array = format[i] === 'F'
                        ? locales[result.getLocale()].monthNames
                        : locales[result.getLocale()].monthShortNames;
                    for (let m = 0; m < array.length; m++) {
                        match = date.match(new RegExp('^' + array[m]));
                        if (match !== null) {
                            match = match[0];
                            result.setMonthSafely(m);
                            break;
                        }
                    }
                    break;
                }
                case 'm':
                case 'n':
                    match = date.match(
                        format[i] === 'm' ? /^[0-9]{2}/ : /^[0-9]{1,2}/
                    );
                    if (match !== null) {
                        match = match[0];
                        if (match > 0 && match < 13) {
                            result.setMonthSafely(match - 1);
                        } else {
                            match = null;
                        }
                    }
                    break;
                case 'Y':
                case 'y':
                    match = date.match(
                        format[i] === 'Y' ? /^[0-9]{4}/ : /^[0-9]{2}/
                    );
                    if (match !== null) {
                        match = match[0];
                        result.setFullYear(parseInt(format[i] === 'Y' ? match : '20' + match));
                    }
                    break;
                case 'g':
                case 'G':
                case 'h':
                case 'H':
                    match = date.match(format[i] === 'h' || format[i] === 'H' ? /^[0-9]{2}/ : /^[0-9]{1,2}/);
                    if (match !== null) {
                        match = match[0];
                        if (
                            match >= 0
                            && (
                                ((format[i] === 'g' || format[i] === 'h') && match < 13)
                                || ((format[i] === 'G' || format[i] === 'H') && match < 24)
                            )
                        ) {
                            result.setHours(parseInt(match));
                        } else {
                            match = null;
                        }
                    }
                    break;
                case 'i':
                case 's':
                    match = date.match(/^[0-9]{2}/);
                    if (match !== null) {
                        match = match[0];
                        if (match > 0 && match < 60) {
                            if (format[i] === 'i') {
                                result.setMinutes(parseInt(match));
                            } else {
                                result.setSeconds(parseInt(match));
                            }
                        }
                    }
                    break;
                default:
                    match = format[i];
                    break;
            }
            if (match === null) {
                result.setTime(NaN); // make it an invalid date
                break;
            }
            date = date.replace(match, '');
        }
        return result;
    }

    /**
     * Get name of day.
     */
    getDayName(): string {
        return locales[this.locale].dayNames[this.getDay()];
    }

    /**
     * Get short name of day.
     */
    getDayShortName(): string {
        return locales[this.locale].dayShortNames[this.getDay()];
    }

    /**
     * Get name of month.
     */
    getMonthName(): string {
        return locales[this.locale].monthNames[this.getMonth()];
    }

    /**
     * Get short name of month.
     */
    getMonthShortName(): string {
        return locales[this.locale].monthShortNames[this.getMonth()];
    }

    /**
     * Get day number in month (starting from 1).
     */
    getRealDay(): string {
        return _datePad(this.getDate());
    }

    /**
     * Get month number in year (starting from 1).
     */
    getRealMonth(): string {
        return _datePad(this.getMonth() + 1);
    }

    setMonthSafely(month: number): number {
        const clone = this.clone();
        clone.setDate(1);
        clone.setMonth(month);
        const lastDay = parseInt(clone.format('t'));
        if (lastDay < this.getDate()) {
            this.setDate(lastDay);
        }
        this.setMonth(month);
        return this.getTime();
    }

    /**
     * Subtract a number (amount) of `type` interval from date.
     */
    sub(amount: number, type: DateInterval = 'day'): this {
        switch (type) {
            case 'day':
                this.setDate(this.getDate() - amount);
                break;
            case 'week':
                this.setDate(this.getDate() - (amount * 7));
                break;
            case 'month':
                this.setMonthSafely(this.getMonth() - amount);
                break;
            case 'year':
                this.setFullYear(this.getFullYear() - amount);
                break;
            case 'hour':
                this.setHours(this.getHours() - amount);
                break;
            case 'minute':
                this.setMinutes(this.getMinutes() - amount);
                break;
            case 'second':
                this.setSeconds(this.getSeconds() - amount);
                break;
            default:
                throw new Error('Invalid interval type');
        }
        return this;
    }

    /**
     * Add a number (amount) of `type` interval from date.
     */
    add(amount: number, type: DateInterval = 'day'): this {
        this.sub(-amount, type);
        return this;
    }

    /**
     * Return date formatted by given format (PHP style formats).
     */
    format(format: string): string {
        const cache: any = {};
        let result = '',
            cur;
        for (let i = 0; i < format.length; i++) {
            if (format[i] in cache) {
                cur = cache[format[i]];
            } else {
                cur = _formatOne(this, format[i]);
            }
            result += cur;
            cache[format[i]] = cur;
        }
        return result;
    }

    /**
     * Return a new Date instance with same values as current Date.
     */
    clone(): DateExtended {
        return new DateExtended(this.getTime());
    }

    /**
     * Check if this instance of Date is valid.
     */
    isValid(): boolean {
        return !isNaN(this.getTime());
    }
}

//////
const oneDay = 1000 * 60 * 60 * 24;

/**
 * Add leading zero if v is less than 10
 * @param v
 * @returns {string}
 * @private
 */
function _datePad(v: any) {
    return v < 10 ? '0' + v : v;
}

/**
 * Format date by given char (PHP style formats).
 */
function _formatOne(date: DateExtended, format: string): string {
    switch (format) {
        // Day
        case 'd':
            return date.getRealDay();
        case 'D':
            return date.getDayShortName();
        case 'j':
            return date.getDate().toString();
        case 'l':
            return date.getDayName();
        case 'N': {
            const d = date.getDay();
            if (d === 0) {
                return '7';
            }
            return d.toString();
        }
        case 'S': {
            const d = date.getDate();
            if (d > 3 && d < 21) {
                return 'th';
            }
            switch (d % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }
        case 'w':
            return date.getDay().toString();
        case 'z': {
            const yearStart = new DateExtended(date.getFullYear() + '-01-01'),
                cmp = new DateExtended(`${date.getFullYear()}-${date.getRealMonth()}-${date.getRealDay()}`);
            return ((cmp.getTime() - yearStart.getTime()) / oneDay).toString();
        }
        // Week
        case 'W':
            return _getWeekNumber(date).week.toString();
        // Month
        case 'F':
            return date.getMonthName();
        case 'm':
            return date.getRealMonth();
        case 'M':
            return date.getMonthShortName();
        case 'n':
            return (date.getMonth() + 1).toString();
        case 't':
            return (new DateExtended(date.getFullYear(), date.getMonth() + 1, 0)).getRealDay();
        // Year
        case 'L':
            return date.getFullYear() - (Math.floor(date.getFullYear() / 4) * 4) === 0 ? '1' : '0';
        case 'o':
            return _getWeekNumber(date).year.toString();
        case 'Y':
            return date.getFullYear().toString();
        case 'y':
            return date.getFullYear().toString().substr(2);
        // Time
        case 'a':
            return date.getHours() >= 12 ? 'pm' : 'am';
        case 'A':
            return date.getHours() >= 12 ? 'PM' : 'AM';
        case 'B':
            return Math.floor(
                (
                    ((date.getUTCHours() + 1) % 24)
                    + date.getUTCMinutes() / 60
                    + date.getUTCSeconds() / 3600
                ) * 1000 / 24
            ).toString();
        case 'g': {
            const g = date.getHours();
            if (g > 12) {
                return (g - 12).toString();
            } else if (g === 0) {
                return '12';
            }
            return g.toString();
        }
        case 'G':
            return date.getHours().toString();
        case 'h':
            return _datePad(_formatOne(date, 'g'));
        case 'H':
            return _datePad(date.getHours());
        case 'i':
            return _datePad(date.getMinutes());
        case 's':
            return _datePad(date.getSeconds());
        case 'u':
            break; // unsupported
        case 'v':
            return date.getUTCMilliseconds().toString();
        // Timezone
        case 'e':
            break; // unsupported
        case 'I':
            break; // unsupported
        case 'O':
        case 'P': {
            const offset = -date.getTimezoneOffset(),
                hours = offset / 60,
                minutes = offset - (hours * 60),
                sign = offset > 0 ? '+' : '-',
                colon = format === 'P' ? ':' : '';
            return sign + _datePad(Math.floor(hours)) + colon + _datePad(minutes);
        }
        case 'T': // unsupported
            break;
        case 'Z':
            return (-date.getTimezoneOffset() * 60).toString();
        // Full Date/Time
        case 'c':
            return date.format('Y-m-dTH:i:sP');
        case 'r':
            return date.format('D, d M Y H:i:s O');
        case 'U':
            return Math.floor(date.getTime() / 1000).toString();
    }
    return format;
}

interface WeekNumber {
    week: number,
    year: number
}

function _getWeekNumber(date: Date): WeekNumber {
    const yearStart = new DateExtended(date.getFullYear() + '-01-01'),
        nearestThursday = new DateExtended(
            Date.UTC(date.getFullYear(), date.getMonth() + 1, 0)
        );
    nearestThursday.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    return {
        year: nearestThursday.getUTCFullYear(),
        week: Math.ceil((((nearestThursday.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
    };
}

function _getLocaleData(locale: string, dataKey: string): string[] {
    if (typeof locale === 'undefined') {
        locale = defaultLocale;
    }
    if (!(locale in locales)) {
        throw new Error(`Locale ${locale} was not defined!`);
    }
    return locales[locale][dataKey].slice(0);
}
