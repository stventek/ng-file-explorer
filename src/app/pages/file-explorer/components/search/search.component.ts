import { Component } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { last } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchInput!: string;

  constructor(private fileSystemService: LocalStorageService) {}

  search() {
    if (this.searchInput) {
      const currentContent =
        this.fileSystemService.currentContentSource.getValue();
      if (currentContent) {
        const result = this.fileSystemService.searchBFSIds(
          this.searchInput,
          currentContent.path + '__folder__'
        );
        this.fileSystemService.updateCurrentContent({ nodes: result });
      }
    } else {
      this.fileSystemService.updateCurrentContent({ nodes: undefined });
    }
  }
}
