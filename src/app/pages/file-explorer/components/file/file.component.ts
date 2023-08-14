import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { calculateContextMenuPosition } from '../../utils/context-menu-utils';
import { getIcon } from '../../utils/icon-utils';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  @Input() node!: IFileNode;
  @ViewChild('fileContextMenu', { static: true }) contextMenuRef!: ElementRef;
  @Output() focused = new EventEmitter<IFileNode>();
  @Output() showProperties = new EventEmitter<boolean>();
  
  isContextMenuOpen = false;
  contextMenuStyles: any;

  constructor(private cdr: ChangeDetectorRef){}

  getIcon(){
    return getIcon(this.node.name);
  }

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

  emitSelectedFile(node: IFileNode){
    this.focused.emit(node);
  }

  handleOpenProperties(){
    this.isContextMenuOpen = false;
    this.showProperties.emit(true);
  }
}
