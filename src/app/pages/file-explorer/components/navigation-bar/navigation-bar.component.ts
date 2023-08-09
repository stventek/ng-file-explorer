import { Component, OnInit } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { Observable } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigation-item.interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  $currentContent!: Observable<CurrentContent | null>; 
  navigationItems: NavigationItem[] = [];

  constructor(private fileSystemService: FilesystemService){
    this.$currentContent = fileSystemService.$currentContent;
  }

  ngOnInit(): void {
    this.$currentContent.subscribe(currentContent => {
      if(currentContent){
        this.navigationItems = this.convertPathToObjects(currentContent.path);
      }
    })
  }

  convertPathToObjects(path: string) {
    const segments = path.split('/').filter(Boolean);
    const result = [];
  
    let currentPath = '';
    for (let i = 0; i < segments.length; i++) {
      currentPath += `/${segments[i]}`;
      result.push({ path: currentPath, text: `${segments[i]}` });
    }
  
    result.unshift({ path: '/', text: 'root' });
  
    return result;
  }

}
