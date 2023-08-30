import { Component } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { IFolderNode } from '../../interfaces/node.interface';

@Component({
  selector: 'app-navigation-pane',
  templateUrl: './navigation-pane.component.html',
  styleUrls: ['./navigation-pane.component.scss'],
})
export class NavigationPaneComponent {
  childrenFolders: IFolderNode[];
  childrenChildrenFolders!: { [key: string]: IFolderNode[] };

  constructor(public fileSystemService: FilesystemService) {
    this.childrenChildrenFolders = {};
    this.childrenFolders =
      this.fileSystemService.fs.getChildrenFolders('/__folder__');
    this.childrenFolders.forEach(child => {
      this.childrenChildrenFolders[child.path + '__folder__'] =
        this.fileSystemService.fs.getChildrenFolders(child.path + '__folder__');
    });
  }
  faFolder = faFolder;
}
