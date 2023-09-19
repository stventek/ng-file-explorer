import { Component, EventEmitter, Output } from '@angular/core';
import { ItemContextMenuService } from '../../services/item-context-menu/item-context-menu.service';
import { contextMenuAction } from '../../types/file-explorer.type';

@Component({
  selector: 'app-folder-context-menu',
  templateUrl: './folder-context-menu.component.html',
  styleUrls: ['./folder-context-menu.component.scss'],
})
export class FolderContextMenuComponent {
  constructor(private itemContextMenuService: ItemContextMenuService) {}
  @Output() clicked = new EventEmitter();

  handleContextMenuAction(type: contextMenuAction) {
    this.clicked.emit();
    this.itemContextMenuService.setAction(type);
  }
}
