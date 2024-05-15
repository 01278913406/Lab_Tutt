import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn = false;

    login(): Observable<boolean> {
        this.isLoggedIn = true;
        return of(this.isLoggedIn);
    }

    logout(): void {
        this.isLoggedIn = false;
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}