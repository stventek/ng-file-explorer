import { Component } from '@angular/core';
import {
  faCirclePlus,
  faSort,
  faFile,
  faFolder,
  faList,
  faGrip,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';
import { SortParams } from '../../interfaces/sort-params.interface';
import { ViewMode } from '../../types/file-explorer.type';
import { Observable } from 'rxjs';

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
  faList = faList;
  faGrid = faGrip;
  openCreateFolderModal = false;
  snackbarMessage = 'Folder created successfully';
  snackbarOpen = false;
  $viewMode: Observable<ViewMode>;

  constructor(
    private fileSystemService: LocalStorageService,
    private itemFocusService: ItemFocusService
  ) {
    this.$viewMode = this.fileSystemService.$viewMode;
  }

  handleCloseCreateFolderMoldal() {
    this.openCreateFolderModal = false;
    this.snackbarOpen = true;
  }
  handleCancelCreateFolderMoldal() {
    this.openCreateFolderModal = false;
  }

  snackbarClose() {
    this.snackbarOpen = false;
  }

  sortChildsBy(sortParams: Partial<SortParams>) {
    this.fileSystemService.sortChildrenBy(sortParams);
  }

  setFocusLost() {
    this.itemFocusService.setFocusLost(false);
  }

  switchViewMode(current: ViewMode) {
    if (current === 'large') this.fileSystemService.updateViewMode('detail');
    if (current === 'detail') this.fileSystemService.updateViewMode('large');
  }
}
