import { Component, Input, OnInit } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { faFolder, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FSData } from '../../interfaces/fs-data.interface';

@Component({
  selector: 'app-navigation-folder',
  templateUrl: './navigation-folder.component.html',
  styleUrls: ['./navigation-folder.component.scss'],
})
export class NavigationFolderComponent {
  graph: FSData;
  hiddenChildren = true;
  node!: IFolderNode;
  _nodeId!: string;
  @Input() set nodeId(value: string) {
    this._nodeId = value;
    this.node = this.graph[this._nodeId] as IFolderNode;
  }

  get nodeId() {
    return this._nodeId;
  }

  faFolder = faFolder;
  faAngleUp = faAngleUp;

  constructor(public fileSystemService: FilesystemService) {
    this.graph = this.fileSystemService.fs.getAdjGraph();
  }
}
