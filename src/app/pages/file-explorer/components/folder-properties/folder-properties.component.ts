import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-folder-properties',
  templateUrl: './folder-properties.component.html',
  styleUrls: ['./folder-properties.component.scss']
})
export class FolderPropertiesComponent {
  @Input() folder: IFolderNode | undefined;
  @Output() showProperties = new EventEmitter<boolean>();
  faFolder = faFolder
  handleCloseProperties(){
    this.showProperties.emit(false);
  }
}
