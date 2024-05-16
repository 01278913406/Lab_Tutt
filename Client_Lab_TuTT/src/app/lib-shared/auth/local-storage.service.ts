import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private readonly USER_KEY = 'cachedUser';
  private readonly EXPIRATION_KEY = 'cachedUserExpiration';
  isPlatformBrowser(): boolean {
    return typeof window !== 'undefined';
  }
  //lưu thông tin người dùng đăng nhập vào storage
  saveUser(user: any, expirationInMinutes: number = 30): void {
    const now = new Date().getTime();
    const expirationTime = now + expirationInMinutes * 60 * 1000; // Convert minutes to milliseconds
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.EXPIRATION_KEY, expirationTime.toString());
  }

  //lấy thông tin người dùng trong storage
  getUser(): any {
    const now = new Date().getTime();
    const expirationTime = parseInt(localStorage.getItem(this.EXPIRATION_KEY) || '0', 10);

    //kiểm tra thời gian lưu thông tin người dùng 
    //nếu quá thời gian thì xóa thông tin người dùng bắt đăng nhập lại
    if (now > expirationTime) {
      this.removeUser();
      return null;
    }

    //kiểm tra thông tin người dùng trong storage
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  //xóa thông tin người dùng đã lưu trong storage
  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
  }
}