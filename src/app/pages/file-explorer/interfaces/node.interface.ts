export type NodeParams<T> = Omit<T, 'date' | 'path' | 'type'> & {
  date?: string;
};

export interface INode {
  name: string;
  creatorName: string;
  size: number;
  path: string;
  date: string;
  parentPath: string | null;
  parentID: string | null;
}

export interface IFolderNode extends INode {
  type: '__folder__';
  children: Set<string>;
  addChildren(node: INode): void;
}

export interface IFileNode extends INode {
  type: '__file__';
}
