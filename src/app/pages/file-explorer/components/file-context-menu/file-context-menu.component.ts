import { Component, EventEmitter, Output } from '@angular/core';
import { ItemContextMenuService } from '../../services/item-context-menu/item-context-menu.service';
import { contextMenuAction } from '../../types/file-explorer.type';

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.scss'],
})
export class FileContextMenuComponent {
  constructor(private itemContextMenuService: ItemContextMenuService) {}

  handleContextMenuAction(type: contextMenuAction) {
    this.itemContextMenuService.setAction(type);
  }
}
