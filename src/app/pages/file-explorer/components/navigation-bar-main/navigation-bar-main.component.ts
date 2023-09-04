import { Component } from '@angular/core';
import {
  faCirclePlus,
  faSort,
  faFile,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
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

  sortChildsBy(data: { type?: 'name' | 'size'; ascending?: boolean }) {
    const currentContent =
      this.fileSystemService.currentContentSource.getValue();
    if (currentContent.path)
      this.fileSystemService.sortChildsBy(
        currentContent.path,
        data.type,
        data.ascending
      );
  }
}
