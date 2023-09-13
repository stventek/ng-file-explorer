import { IFileNode, IFolderNode } from './node.interface';

export interface CurrentContent {
  parentId?: string;
  nodes?: string[];
  selectedNode?: IFolderNode | IFileNode;
}
