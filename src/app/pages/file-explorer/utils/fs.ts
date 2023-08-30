import * as md5 from 'md5';
import { FSData } from '../interfaces/fs-data.interface';
import { IFileNode, IFolderNode } from '../interfaces/node.interface';

export class FileSystemHelper {
  constructor(private graph: FSData) {}

  searchBFS(keyword: string, rootPath: string) {
    const root = md5(rootPath);
    const result: Array<IFileNode | IFolderNode> = [];
    const queue = [root];
    const visited = new Set();
    visited.add(root);
    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentNode = this.graph[current];
      if (currentNode.name.includes(keyword)) {
        result.push(currentNode);
      }
      if (currentNode.type == '__file__') continue;
      currentNode.children.forEach(id => {
        if (!visited.has(id)) {
          queue.push(id);
          visited.add(id);
        }
      });
    }
    return result;
  }

  addNode(node: IFileNode | IFolderNode) {
    const nodeId = md5(node.path);
    this.graph[nodeId] = node;
    if (node.parentID) {
      const parent = this.graph[node.parentID] as IFolderNode;
      parent.addChildren(node);
    }
  }

  updateNode(path: string, data: Partial<IFileNode> | Partial<IFolderNode>) {
    const nodeId = md5(path);
    const node = this.graph[nodeId];
    if (!node || node.name === 'root') return;
    if (data.name) {
      //update path
      node.name = data.name;
      node.path = `${node.parentPath!.replace(/\/$/, '')}/${data.name}`;
      //update reference in graph
      if (node.type == '__folder__')
        this.graph[md5(node.path + '__folder__')] = node;
      else this.graph[md5(node.path + '__file__')] = node;
      const parent = this.graph[node.parentID!] as IFolderNode;
      //update parent children reference
      parent.children.delete(nodeId);
      parent.addChildren(node);
      //delete old node reference
      delete this.graph[nodeId];
    }
    Object.assign(node, data);
  }

  deleteNode(path: string) {
    const nodeId = md5(path);
    const node = this.graph[nodeId];
    if (!node || node.name === 'root') return;
    const parent = this.graph[node.parentID!] as IFolderNode;
    console.log(parent.children instanceof Array);
    parent.children.delete(nodeId);
    delete this.graph[nodeId];
  }

  getChildrenNodes(path: string, fileType?: '__folder__' | '__file__') {
    const parent = this.graph[md5(path)] as IFolderNode;
    if (parent) {
      let childs = Array.from(parent.children);
      return childs.reduce<(IFolderNode | IFileNode)[]>((result, id) => {
        const child = this.graph[id];
        if (fileType) {
          if (child.type == fileType) result.push(child);
        } else result.push(child);
        return result;
      }, []);
    } else {
      throw Error('Not such node');
    }
  }

  getChildrenFolders(path: string) {
    console.log('test');
    const parent = this.graph[md5(path)] as IFolderNode;
    if (parent) {
      let childs = Array.from(parent.children);
      return childs.reduce<IFolderNode[]>((result, id) => {
        const child = this.graph[id];
        if (child.type == '__folder__') result.push(child);
        return result;
      }, []);
    } else {
      throw Error('Not such node');
    }
  }
}
