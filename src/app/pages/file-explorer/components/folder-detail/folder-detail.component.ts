import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { calculateContextMenuPosition } from '../../utils/context-menu-utils';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.scss'],
})
export class FolderDetailComponent {
  @Input() node!: IFolderNode;
  @Input() nodeFocus!: boolean;
  @ViewChild('folderContextMenu', { static: true }) contextMenuRef!: ElementRef;

  faFolder = faFolder;
  isContextMenuOpen = false;
  contextMenuStyles: any;
  isMobile: boolean;
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.isContextMenuOpen = true;
    //update template
    this.cdr.detectChanges();
    this.contextMenuStyles = calculateContextMenuPosition(
      event,
      this.contextMenuRef
    );
  }

  onClickedOutside(e: any) {
    this.isContextMenuOpen = false;
  }

  openFolder() {
    this.router.navigate([this.node.path]);
  }

  handleContextMenuAction() {
    console.log('test');
    this.isContextMenuOpen = false;
  }
}
