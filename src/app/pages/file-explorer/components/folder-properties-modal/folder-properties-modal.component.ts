import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { IFolderNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-folder-properties-modal',
  templateUrl: './folder-properties-modal.component.html',
  styleUrls: ['./folder-properties-modal.component.scss'],
})
export class FolderPropertiesModalComponent {
  @Input() folder!: IFolderNode;
  @Input() openPropertiesModal!: Subject<boolean>;
  faFolder = faFolder;

  handleCloseModal() {
    this.openPropertiesModal.next(false);
  }
}
