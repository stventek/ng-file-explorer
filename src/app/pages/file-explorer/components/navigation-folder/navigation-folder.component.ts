import { Component, Input, OnInit } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { faFolder, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FSData } from '../../interfaces/fs-data.interface';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-folder',
  templateUrl: './navigation-folder.component.html',
  styleUrls: ['./navigation-folder.component.scss'],
})
export class NavigationFolderComponent {
  hiddenChildren = true;
  @Input() nodeId!: string;
  $graph: Observable<FSData | null>;

  faFolder = faFolder;
  faAngleUp = faAngleUp;

  constructor(public fileSystemService: LocalStorageService) {
    this.$graph = this.fileSystemService.$graph;
  }
  getNode(graph: FSData) {
    return graph[this.nodeId] as IFolderNode;
  }
}
