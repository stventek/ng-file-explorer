import { IFileNode, IFolderNode } from './node.interface';

export interface CurrentContent {
  path?: string;
  nodes?: string[];
  selectedNode?: IFolderNode | IFileNode;
}
