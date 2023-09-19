import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ItemFocusService } from '../../services/item-focus/item-focus.service';
import * as md5 from 'md5';

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
    public router: Router,
    private itemFocusService: ItemFocusService
  ) {
    this.$currentContent = this.fileSystemService.$currentContent;
  }

  setFocusLost() {
    this.itemFocusService.setFocusLost(false);
  }

  ngOnInit(): void {
    this.fileSystemService.initialize().subscribe(val => {
      this.navigateTo(this.router.url);
      this.routerSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.navigateTo(this.router.url);
        }
      });
    });
  }

  navigateTo(path: string) {
    if (path === '/') this.router.navigate([md5('/__folder__')]);
    else {
      try {
        this.fileSystemService.updateCurrentContent({
          parentId: path.split('/').pop()!,
          nodes: undefined,
        });
        this.fileSystemService.applyCurrentContentSort();
      } catch (err) {
        this.router.navigate(['/']);
      }
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
