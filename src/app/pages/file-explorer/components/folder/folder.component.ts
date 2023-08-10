import { Component, Input } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent {
  @Input() node!: IFolderNode;
  faFolder = faFolder;
  isContextMenuOpen = false;
  x = 0;
  y = 0;
  
  openContextMenu(event: MouseEvent){
    event.preventDefault();
    this.x = event.x;
    this.y = event.y;
    this.isContextMenuOpen = true;
  }

  onClickedOutside(e: any){
    this.isContextMenuOpen = false;
  }
}
