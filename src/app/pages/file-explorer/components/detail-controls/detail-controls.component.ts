import { Component } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Observable } from 'rxjs';
import { SortParams } from '../../interfaces/sort-params.interface';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';
@Component({
  selector: 'app-detail-controls',
  templateUrl: './detail-controls.component.html',
  styleUrls: ['./detail-controls.component.scss'],
})
export class DetailControlsComponent {
  faArrowUp = faArrowUp;
  $sortParams: Observable<SortParams>;
  constructor(
    private fileSystemService: LocalStorageService,
    private itemFocusService: ItemFocusService
  ) {
    this.$sortParams = fileSystemService.$sortParams;
  }

  setFocusLost() {
    this.itemFocusService.setFocusLost(false);
  }

  sortChildrenBy(type: 'name' | 'size' | 'modified') {
    const sortParams = this.fileSystemService.sortParamsSource.getValue();
    if (sortParams.sortType === type) {
      this.fileSystemService.sortChildrenBy({
        ascending: !sortParams.ascending,
      });
    } else {
      this.fileSystemService.sortChildrenBy({
        ascending: true,
        sortType: type,
      });
    }
  }
}
