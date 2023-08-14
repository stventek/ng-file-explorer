import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-context-menu',
  templateUrl: './file-context-menu.component.html',
  styleUrls: ['./file-context-menu.component.scss']
})
export class FileContextMenuComponent {
  @Output() showProperties = new EventEmitter<boolean>();

  handleOpenProperties(){
    this.showProperties.emit(true);
  }
}
