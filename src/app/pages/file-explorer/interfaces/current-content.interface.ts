import { IFileNode, IFolderNode } from './node.interface';

export interface CurrentContent {
  path: string;
  nodes: Array<IFileNode | IFolderNode>;
}
