import { Component, OnInit } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { Observable, Subscription } from 'rxjs';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit{
  $currentContent: Observable<(IFileNode | IFolderNode)[] | null>;
  private routerSubscription!: Subscription;
  
  constructor(private fileSystemService: FilesystemService, public router: Router){
    this.$currentContent = this.fileSystemService.$currentContent;
  }
  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(() => {
      const path = decodeURIComponent(this.router.url);
      this.fileSystemService.updateCurrentContent(path);
    });
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
