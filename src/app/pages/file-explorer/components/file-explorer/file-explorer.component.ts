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
  openLogin = false;
  openSignUp = false;
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
    const prefix = this.fileSystemService.prefix;
    const pathWithoutPrefix = path.split(prefix)[1];
    if (pathWithoutPrefix === '')
      this.router.navigate([prefix + '/' + md5('/__folder__')], {
        replaceUrl: true,
      });
    else {
      try {
        this.fileSystemService.updateCurrentContent({
          parentId: pathWithoutPrefix.split('/').pop()!,
          nodes: undefined,
          selectedNode: undefined,
        });
        this.fileSystemService.applyCurrentContentSort();
      } catch (err) {
        this.router.navigate(['/' + prefix]);
      }
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
