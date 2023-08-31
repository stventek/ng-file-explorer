import { Component } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { IFolderNode } from '../../interfaces/node.interface';
import { FSData } from '../../interfaces/fs-data.interface';
import * as md5 from 'md5';

@Component({
  selector: 'app-navigation-pane',
  templateUrl: './navigation-pane.component.html',
  styleUrls: ['./navigation-pane.component.scss'],
})
export class NavigationPaneComponent {
  graph: FSData;
  rootNode: IFolderNode;
  constructor(public fileSystemService: FilesystemService) {
    this.graph = this.fileSystemService.fs.getAdjGraph();
    this.rootNode = this.graph[md5('/__folder__')] as IFolderNode;
  }
  faFolder = faFolder;
}
