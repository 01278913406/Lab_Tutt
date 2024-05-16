import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private _LocalStorageService: LocalStorageService) { }
    private isLoggedIn = false;

    login(): Observable<boolean> {
        this.isLoggedIn = true;
        return of(this.isLoggedIn);
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    isAuthenticated(): boolean {
        if (this._LocalStorageService.getUser() != null)
            this.isLoggedIn = false;
        return this.isLoggedIn;
    }
}