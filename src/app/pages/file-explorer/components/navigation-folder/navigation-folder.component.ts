import { Component, Input, OnInit } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'details[app-navigation-folder]',
  templateUrl: './navigation-folder.component.html',
  styleUrls: ['./navigation-folder.component.scss']
})
export class NavigationFolderComponent {
  @Input() node!: IFolderNode;
  @Input() childsFolders !: IFolderNode[];
  faFolder = faFolder;
  constructor(public fileSystemService: FilesystemService){}
}
