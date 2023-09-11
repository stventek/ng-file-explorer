import { Component } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Observable } from 'rxjs';
import { SortParams } from '../../interfaces/sort-params.interface';
@Component({
  selector: 'app-detail-controls',
  templateUrl: './detail-controls.component.html',
  styleUrls: ['./detail-controls.component.scss'],
})
export class DetailControlsComponent {
  faArrowUp = faArrowUp;
  $sortParams: Observable<SortParams>;
  constructor(private fileSystemService: LocalStorageService) {
    this.$sortParams = fileSystemService.$sortParams;
  }

  sortChildsBy(type: 'name' | 'size' | 'modified') {
    const sortParams = this.fileSystemService.sortParamsSource.getValue();
    if (sortParams.sortType === type) {
      this.fileSystemService.updateSortParams({
        ascending: !sortParams.ascending,
      });
    } else {
      this.fileSystemService.updateSortParams({
        ascending: true,
        sortType: type,
      });
    }
  }
}
