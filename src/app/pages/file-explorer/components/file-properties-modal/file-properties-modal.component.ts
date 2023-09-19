import { Component, Input } from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { Subject } from 'rxjs';
import { getIcon } from '../../utils/icon-utils';
import { bytesToSize } from '../../utils/bytes-to-size';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-properties-modal',
  templateUrl: './file-properties-modal.component.html',
  styleUrls: ['./file-properties-modal.component.scss'],
})
export class FilePropertiesModalComponent {
  @Input() openPropertiesModal!: Subject<boolean>;
  faX = faX;
  _file!: IFileNode;
  size = '';
  @Input() set file(value: IFileNode) {
    this._file = value;
    this.size = bytesToSize(this._file.size);
  }

  get file() {
    return this._file;
  }

  handleCloseModal() {
    this.openPropertiesModal.next(false);
  }
  getIcon() {
    return getIcon(this.file!.name);
  }
}
