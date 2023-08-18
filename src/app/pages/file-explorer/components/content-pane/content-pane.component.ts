import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { IFileNode, IFolderNode } from '../../interfaces/node.interface';
import { CurrentContent } from '../../interfaces/current-content.interface';

@Component({
  selector: 'app-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss']
})
export class ContentPaneComponent {
  @Input() currentContent!: CurrentContent;
  selectedNode: (IFolderNode | IFileNode) | undefined;
  openProperties = true;
  nodeFocus = false;
  selectedElement: HTMLElement | undefined;
  @ViewChild('properties', { static: true }) propertiesElement!: ElementRef;

  setSeletedNode(data: {node: (IFolderNode | IFileNode), target: HTMLElement}){
    this.selectedElement = data.target;
    this.selectedNode = data.node;
    this.nodeFocus = true;
  }

  unSelectNode(){
    const propertiesElement = this.propertiesElement.nativeElement;
    window.setTimeout(()=> {
      if(!(this.selectedElement && (document.activeElement == this.selectedElement || document.activeElement == propertiesElement || propertiesElement.contains(document.activeElement)))){
        this.nodeFocus = false;
      }
    }, 0)
  }

  handleShowProperties(val: boolean){
    this.openProperties = val;
  }
}
