import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchInput!: string;

  constructor(private fileSystemService: LocalStorageService) {
    this.fileSystemService.$currentContent.subscribe(val => {
      if (val.nodes === undefined) this.searchInput = '';
    });
  }

  search() {
    if (this.searchInput) {
      const currentContent =
        this.fileSystemService.currentContentSource.getValue();
      if (currentContent) {
        const result = this.fileSystemService.searchBFSIds(
          this.searchInput,
          currentContent.parentId!
        );
        this.fileSystemService.updateCurrentContent({ nodes: result });
      }
    } else {
      this.fileSystemService.updateCurrentContent({ nodes: undefined });
    }
  }
}
