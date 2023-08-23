import { Component, Input } from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { Subject } from 'rxjs';
import { getIcon } from '../../utils/icon-utils';

@Component({
  selector: 'app-file-properties-modal',
  templateUrl: './file-properties-modal.component.html',
  styleUrls: ['./file-properties-modal.component.scss'],
})
export class FilePropertiesModalComponent {
  @Input() file!: IFileNode;
  @Input() openPropertiesModal!: Subject<boolean>;

  handleCloseModal() {
    this.openPropertiesModal.next(false);
  }
  getIcon() {
    return getIcon(this.file!.name);
  }
}
