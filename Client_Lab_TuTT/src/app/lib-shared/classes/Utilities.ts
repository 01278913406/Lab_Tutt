import { Injectable } from "@angular/core";

@Injectable()
export class Utilities {
    public static isNullOrEmpty(obj: any): boolean {
        return obj === null || obj === undefined ||
          (typeof obj === 'object' && Object.keys(obj).length === 0) ||
          (Array.isArray(obj) && obj.length === 0) ||
          (typeof obj === 'string' && obj.trim().length === 0);
      }
}
