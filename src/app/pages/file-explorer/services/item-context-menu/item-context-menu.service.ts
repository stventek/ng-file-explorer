import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { contextMenuAction } from '../../types/file-explorer.type';

@Injectable({
  providedIn: 'root',
})
export class ItemContextMenuService {
  private actionSubject = new Subject<contextMenuAction>();
  $action = this.actionSubject.asObservable();
  constructor() {}

  setAction(action: contextMenuAction) {
    this.actionSubject.next(action);
  }
}
