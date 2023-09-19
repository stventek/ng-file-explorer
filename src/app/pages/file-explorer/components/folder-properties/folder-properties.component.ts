import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { faFolder, faX } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { bytesToSize } from '../../utils/bytes-to-size';

@Component({
  selector: 'app-folder-properties',
  templateUrl: './folder-properties.component.html',
  styleUrls: ['./folder-properties.component.scss'],
})
export class FolderPropertiesComponent {
  @Output() showProperties = new EventEmitter<boolean>();
  faFolder = faFolder;
  faX = faX;
  _folder!: IFolderNode;
  size = '';
  @Input() set folder(value: IFolderNode) {
    this._folder = value;
    this.size = bytesToSize(this._folder.size);
  }

  get folder() {
    return this._folder;
  }

  handleCloseProperties() {
    this.showProperties.emit(false);
  }
}
