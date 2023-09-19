import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerServiceService {
  drawerState = new BehaviorSubject<boolean>(false);
  $drawerState = this.drawerState.asObservable();

  constructor() {}

  toggleDrawerState() {
    this.drawerState.next(!this.drawerState.getValue());
  }
}
