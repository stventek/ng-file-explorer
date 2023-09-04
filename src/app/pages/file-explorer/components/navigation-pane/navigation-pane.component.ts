import { Component } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { IFolderNode } from '../../interfaces/node.interface';
import { FSData } from '../../interfaces/fs-data.interface';
import * as md5 from 'md5';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-navigation-pane',
  templateUrl: './navigation-pane.component.html',
  styleUrls: ['./navigation-pane.component.scss'],
})
export class NavigationPaneComponent {
  $graph: Observable<FSData | null>;
  constructor(public fileSystemService: LocalStorageService) {
    this.$graph = this.fileSystemService.$graph;
  }

  getParentNodeChilds(graph: FSData) {
    const parentId = md5('/__folder__');
    const parentNode = graph[parentId] as IFolderNode | undefined;
    if (parentNode) {
      return parentNode.children;
    }
    return [];
  }
  faFolder = faFolder;
}
