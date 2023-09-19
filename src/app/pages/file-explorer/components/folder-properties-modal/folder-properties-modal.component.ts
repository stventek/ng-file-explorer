import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { faFolder, faX } from '@fortawesome/free-solid-svg-icons';
import { IFolderNode } from '../../interfaces/node.interface';
import { bytesToSize } from '../../utils/bytes-to-size';

@Component({
  selector: 'app-folder-properties-modal',
  templateUrl: './folder-properties-modal.component.html',
  styleUrls: ['./folder-properties-modal.component.scss'],
})
export class FolderPropertiesModalComponent {
  @Input() openPropertiesModal!: Subject<boolean>;
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

  handleCloseModal() {
    this.openPropertiesModal.next(false);
  }
}
