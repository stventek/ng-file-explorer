import * as md5 from 'md5';
import {
  FolderParams,
  IFileNode,
  IFolderNode,
  INode,
  NodeParams,
} from '../interfaces/node.interface';

class Node implements INode {
  name!: string;
  creatorName!: string;
  size!: number;
  path!: string;
  date!: string;
  parentPath!: string | null;
  parentID!: string | null;
  constructor(params: NodeParams<INode>) {
    Object.assign(this, params);
    if (!this.date) this.date = new Date().toISOString().split('T')[0];
    if (this.parentPath)
      this.path = joinPathWithName(this.parentPath, this.name);
    else this.path = '/';
  }
}

export class FileNode extends Node implements IFileNode {
  type!: '__file__';
  constructor(fileArgs: NodeParams<IFileNode>) {
    super(fileArgs);
    this.type = '__file__';
  }
}

export class FolderNode extends Node implements IFolderNode {
  type!: '__folder__';
  children!: Array<string>;
  constructor(folderArgs: FolderParams) {
    super(folderArgs);
    this.type = '__folder__';
    this.children = folderArgs?.children ?? [];
  }
  addChildren(node: FolderNode | FileNode) {
    this.children.push(md5(node.path + node.type));
  }
}

export const isFolder = (
  node: IFolderNode | IFileNode
): node is IFolderNode => {
  return node.type === '__folder__';
};

export const isFile = (node: IFolderNode | IFileNode): node is IFileNode => {
  return node.type === '__file__';
};

export const joinPathWithName = (path: string, name: string) => {
  return `${path.replace(/\/$/, '')}/${name}`;
};
