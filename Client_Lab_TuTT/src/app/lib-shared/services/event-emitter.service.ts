import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

//   private eventSubjectLogin = new Subject<any>();

//   // Observable for the event
//   eventLogin$ = this.eventSubjectLogin.asObservable();

//   // Method to emit an event
//   emitEventLogin(event: any) {
//     this.eventSubjectLogin.next(event);


    private eventSubjectLogin = new Subject<any>();
    
    // Observable for event A
    eventLogin$ = this.eventSubjectLogin.asObservable();
    
    // Method to emit event A
    emitEventLogin(event: any) {
      this.eventSubjectLogin.next(event);
    }
    
}