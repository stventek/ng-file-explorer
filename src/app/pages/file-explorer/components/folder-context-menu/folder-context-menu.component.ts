import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-folder-context-menu',
  templateUrl: './folder-context-menu.component.html',
  styleUrls: ['./folder-context-menu.component.scss']
})
export class FolderContextMenuComponent {

  @Output() contextMenuAction = new EventEmitter<'open_properties' | 'delete' | 'rename'>();

  handleContextMenuAction(type : 'open_properties' | 'delete' | 'rename'){
    this.contextMenuAction.emit(type)
  }
}
