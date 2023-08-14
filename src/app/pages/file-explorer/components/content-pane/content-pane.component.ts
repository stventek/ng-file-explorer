import { Component, Input } from '@angular/core';
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
  fileFocus = false;
  folderFoucs = false;
  propertiesFocus = false;

  setSeletedNode(node: (IFolderNode | IFileNode)){
    if(node.type == '__file__') this.fileFocus = true;
    else this.folderFoucs = true;
    this.propertiesFocus = true;
    this.selectedNode = node;
  }

  unSeletedNode(node: (IFolderNode | IFileNode)){
    if(node.type == '__file__') this.fileFocus = false;
    else this.folderFoucs = false;
    if(!this.folderFoucs && !this.fileFocus && !this.propertiesFocus) this.selectedNode = undefined;
  }

  handleShowProperties(val: boolean){
    this.openProperties = val;
  }

  setPropertiesFocus(){
    this.propertiesFocus = true;
  }

  removePropertiesFocus(){
    this.propertiesFocus = false;
    if(!this.folderFoucs && !this.fileFocus && !this.propertiesFocus) this.selectedNode = undefined;
  }
}
