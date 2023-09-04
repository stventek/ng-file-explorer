import { Component } from '@angular/core';
import {
  faCirclePlus,
  faSort,
  faFile,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-navigation-bar-main',
  templateUrl: './navigation-bar-main.component.html',
  styleUrls: ['./navigation-bar-main.component.scss'],
})
export class NavigationBarMainComponent {
  faSort = faSort;
  faCirclePlus = faCirclePlus;
  faFile = faFile;
  faFolder = faFolder;
  openCreateFolderModal = false;

  constructor(private fileSystemService: LocalStorageService) {}

  handleCloseCreateFolderMoldal() {
    this.openCreateFolderModal = false;
  }

  sortBy(type: 'name' | 'size') {
    const currentContent =
      this.fileSystemService.currentContentSource.getValue();
    if (currentContent.path)
      this.fileSystemService.sortBy(currentContent.path, type);
  }
}
