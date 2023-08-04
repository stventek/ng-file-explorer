import { Component, Input } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { FilesystemService } from '../../services/filesystem/filesystem.service';

@Component({
  selector: 'app-navigation-folder',
  templateUrl: './navigation-folder.component.html',
  styleUrls: ['./navigation-folder.component.scss']
})
export class NavigationFolderComponent {
  showChildren = false;
  @Input() node!: IFolderNode;

  constructor(public fileSystemService: FilesystemService){}

  toggleShowChildren() {
    this.showChildren = !this.showChildren;
  }
}
