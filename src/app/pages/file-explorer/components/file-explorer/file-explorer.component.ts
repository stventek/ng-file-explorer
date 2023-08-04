import { Component, OnInit } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { Observable, Subscription } from 'rxjs';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { CurrentContent } from '../../interfaces/current-content.interface';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit{
  $currentContent: Observable<CurrentContent | null>;
  private routerSubscription!: Subscription;
  
  constructor(private fileSystemService: FilesystemService, public router: Router){
    this.$currentContent = this.fileSystemService.$currentContent;
  }

  ngOnInit(): void {
    this.navigateTo(this.router.url);
    
    this.routerSubscription = this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.navigateTo(this.router.url);
      }
    });
  }

  navigateTo(path: string){
    path = decodeURIComponent(path);
    try{
      this.fileSystemService.updateCurrentContentByPath(path);
    }catch(err){
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
