import { Component } from '@angular/core';
import { faFolderPlus, faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-bar-main',
  templateUrl: './navigation-bar-main.component.html',
  styleUrls: ['./navigation-bar-main.component.scss']
})
export class NavigationBarMainComponent {
  faSort = faSort;
  faFolderPlus = faFolderPlus;
}
