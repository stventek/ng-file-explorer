import { FileNode, FolderNode } from "../utils/node";
import { IFileNode, IFolderNode } from "./node.interface";

export interface FSData {
    [key: string]: IFolderNode | IFileNode;
  }
  