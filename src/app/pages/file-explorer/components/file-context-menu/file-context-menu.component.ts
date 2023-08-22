import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.scss'],
})
export class FileContextMenuComponent {
  @Output() contextMenuAction = new EventEmitter<
    'open_properties' | 'delete' | 'rename'
  >();

  handleContextMenuAction(type: 'open_properties' | 'delete' | 'rename') {
    this.contextMenuAction.emit(type);
  }
}
