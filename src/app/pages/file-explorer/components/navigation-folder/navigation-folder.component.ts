import { Component, Input, OnInit } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'details[app-navigation-folder]',
  templateUrl: './navigation-folder.component.html',
  styleUrls: ['./navigation-folder.component.scss'],
})
export class NavigationFolderComponent implements OnInit {
  @Input() node!: IFolderNode;
  @Input() childsFolders!: IFolderNode[];
  childrenChildrenFolders: { [key: string]: IFolderNode[] } = {};
  faFolder = faFolder;
  constructor(public fileSystemService: FilesystemService) {}
  ngOnInit(): void {
    this.childsFolders.forEach(child => {
      this.childrenChildrenFolders[child.path + '__folder__'] =
        this.fileSystemService.fs.getChildrenFolders(child.path + '__folder__');
    });
  }
}
