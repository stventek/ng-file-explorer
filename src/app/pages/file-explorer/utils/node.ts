import * as md5 from "md5";
import { IFileNode, IFolderNode, INode, NodeParams } from "../interfaces/node.interface";

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
      if (!this.date) this.date = new Date().toISOString();
      if (this.parentPath)
        this.path = `${this.parentPath.replace(/\/$/, '')}/${this.name}`;
      else this.path = "/";
    }
  }
  
  export class FileNode extends Node implements IFileNode {
    type!: "__file__";
    constructor(fileArgs: NodeParams<IFileNode>) {
      super(fileArgs);
      this.type = "__file__";
    }
  }
  
  export class FolderNode extends Node implements IFolderNode {
    type!: "__folder__";
    children!: Set<string>;
    constructor(folderArgs: NodeParams<IFolderNode>) {
      super(folderArgs);
      this.type = "__folder__";
      this.children = folderArgs.children;
    }
    addChildren(node: FolderNode | FileNode) {
      this.children.add(md5(node.path));
    }
  }