import { Component, OnInit } from '@angular/core';
import { CurrentContent } from '../../interfaces/current-content.interface';
import { Observable, combineLatest } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigation-item.interface';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import * as md5 from 'md5';
import { FSData } from '../../interfaces/fs-data.interface';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  navigationItems: NavigationItem[] = [];
  faCircleUp = faCircleUp;
  $currentContent!: Observable<CurrentContent | null>;
  $graph: Observable<FSData | null>;

  constructor(private fileSystemService: LocalStorageService) {
    this.$currentContent = this.fileSystemService.$currentContent;
    this.$graph = this.fileSystemService.$graph;
  }

  ngOnInit(): void {
    combineLatest([this.$currentContent, this.$graph]).subscribe(
      ([currentContent, graph]) => {
        if (currentContent && currentContent.parentId && graph) {
          this.navigationItems = this.convertPathToObjects(
            graph[currentContent.parentId].path
          );
        }
      }
    );
  }

  convertPathToObjects(path: string) {
    const segments = path.split('/').filter(Boolean);
    const result = [];

    let currentPath = '';
    for (let i = 0; i < segments.length; i++) {
      currentPath += `/${segments[i]}`;
      result.push({
        id: md5(currentPath + '__folder__'),
        text: `${segments[i]}`,
      });
    }

    result.unshift({ id: '/', text: 'root' });

    return result;
  }

  unselectNode() {
    this.fileSystemService.updateCurrentContent({ selectedNode: undefined });
  }
}
