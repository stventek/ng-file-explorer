import { Component } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-pane',
  templateUrl: './navigation-pane.component.html',
  styleUrls: ['./navigation-pane.component.scss'],
})
export class NavigationPaneComponent {
  constructor(public fileSystemService: FilesystemService) {}
  faFolder = faFolder;
}
