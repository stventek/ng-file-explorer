import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { calculateContextMenuPosition } from '../../utils/context-menu-utils';
import { Router } from '@angular/router';
import * as md5 from 'md5';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent {
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
    private deviceService: DeviceDetectorService,
    private fileSystemService: LocalStorageService
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
    this.router.navigate([md5(this.node.path + this.node.type)]);
  }

  handleContextMenuAction() {
    this.isContextMenuOpen = false;
  }
}
