import { Component } from '@angular/core';
import {
  faCirclePlus,
  faSort,
  faFile,
  faFolder,
  faList,
  faGrip,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';
import { SortParams } from '../../interfaces/sort-params.interface';
import { ViewMode } from '../../types/file-explorer.type';
import { Observable } from 'rxjs';
import { ThemeManagerService } from 'src/app/shared/services/theme-manager/theme-manager.service';

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
  faMoon = faMoon;
  faSun = faSun;
  openCreateFolderModal = false;
  snackbarMessage = 'Folder created successfully';
  snackbarOpen = false;
  $viewMode: Observable<ViewMode>;
  $theme: Observable<'dark' | 'light'>;

  constructor(
    private fileSystemService: LocalStorageService,
    private itemFocusService: ItemFocusService,
    private themeManagerService: ThemeManagerService
  ) {
    this.$viewMode = this.fileSystemService.$viewMode;
    this.$theme = this.themeManagerService.$theme;
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

  toggleTheme() {
    this.themeManagerService.toggleTheme();
  }
}
