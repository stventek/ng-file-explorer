import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IFolderNode } from '../../interfaces/node.interface';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { calculateContextMenuPosition } from '../../utils/context-menu-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent {
  @Input() node!: IFolderNode;
  @ViewChild('folderContextMenu', { static: true }) contextMenuRef!: ElementRef;
  @Output() focused = new EventEmitter<{node: IFolderNode, target: HTMLElement}>();
  @Output() showProperties = new EventEmitter<boolean>();

  faFolder = faFolder;
  isContextMenuOpen = false;
  contextMenuStyles: any;
  
  constructor(private cdr: ChangeDetectorRef, private router: Router){}

  openContextMenu(event: MouseEvent){
    event.preventDefault();
    this.isContextMenuOpen = true;
    //update template
    this.cdr.detectChanges();
    this.contextMenuStyles = calculateContextMenuPosition(event, this.contextMenuRef);
  }

  onClickedOutside(e: any){
    this.isContextMenuOpen = false;
  }

  openFolder(){
    this.router.navigate([this.node.path]);
  }

  emitSelectedFolder(event: FocusEvent, node: IFolderNode){
    const target = event.target as HTMLElement;
    this.focused.emit({node, target});
  }

  handleOpenProperties(){
    this.isContextMenuOpen = false;
    this.showProperties.emit(true);
  }
}
