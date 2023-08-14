import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-folder-context-menu',
  templateUrl: './folder-context-menu.component.html',
  styleUrls: ['./folder-context-menu.component.scss']
})
export class FolderContextMenuComponent {

  @Output() showProperties = new EventEmitter<boolean>();

  handleOpenProperties(){
    this.showProperties.emit(true);
  }
}
