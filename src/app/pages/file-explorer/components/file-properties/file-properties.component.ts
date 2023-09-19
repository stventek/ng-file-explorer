import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { getIcon } from '../../utils/icon-utils';
import { bytesToSize } from '../../utils/bytes-to-size';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-properties',
  templateUrl: './file-properties.component.html',
  styleUrls: ['./file-properties.component.scss'],
})
export class FilePropertiesComponent {
  @Output() showProperties = new EventEmitter<boolean>();

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

  handleCloseProperties() {
    this.showProperties.emit(false);
  }

  getIcon() {
    return getIcon(this.file!.name);
  }
}
