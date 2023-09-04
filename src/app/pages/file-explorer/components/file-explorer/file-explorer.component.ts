import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent implements OnInit, OnDestroy {
  $currentContent: Observable<CurrentContent | null>;
  private routerSubscription!: Subscription;

  constructor(
    private fileSystemService: LocalStorageService,
    public router: Router
  ) {
    this.$currentContent = this.fileSystemService.$currentContent;
  }

  ngOnInit(): void {
    this.fileSystemService.refreshGraph();
    this.navigateTo(this.router.url);

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.navigateTo(this.router.url);
      }
    });
  }

  navigateTo(path: string) {
    path = decodeURIComponent(path);
    try {
      this.fileSystemService.updateCurrentContent({ path });
      this.fileSystemService.sortChildsBy(path);
    } catch (err) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
