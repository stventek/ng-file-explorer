import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ItemFocusService {
  focusLostSource = new BehaviorSubject<boolean>(true);
  $focusLost = this.focusLostSource.asObservable();

  constructor() {}

  setFocusLost(value: boolean) {
    this.focusLostSource.next(value);
  }
}
