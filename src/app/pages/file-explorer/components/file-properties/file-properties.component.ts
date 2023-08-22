import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { getIcon } from '../../utils/icon-utils';

@Component({
  selector: 'app-file-properties',
  templateUrl: './file-properties.component.html',
  styleUrls: ['./file-properties.component.scss'],
})
export class FilePropertiesComponent {
  @Input() file!: IFileNode;
  @Output() showProperties = new EventEmitter<boolean>();

  handleCloseProperties() {
    this.showProperties.emit(false);
  }

  getIcon() {
    return getIcon(this.file!.name);
  }
}
