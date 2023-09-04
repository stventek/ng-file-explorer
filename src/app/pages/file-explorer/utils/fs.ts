import * as md5 from 'md5';
import { FSData } from '../interfaces/fs-data.interface';
import { IFileNode, IFolderNode } from '../interfaces/node.interface';
import { isFolder } from './node';

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

  searchBFSIds(keyword: string, rootPath: string) {
    const root = md5(rootPath);
    const result: Array<string> = [];
    const queue = [root];
    const visited = new Set();
    visited.add(root);
    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentNode = this.graph[current];
      if (currentNode.name.includes(keyword)) {
        result.push(md5(currentNode.path + currentNode.type));
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
    const nodeId = md5(node.path + node.type);
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
      parent.children = parent.children.filter(id => nodeId != id);
      parent.addChildren(node);
      //delete old node reference
      delete this.graph[nodeId];
    }
    Object.assign(node, data);
  }

  deleteNode(node: IFileNode | IFolderNode) {
    const nodeId = md5(node.path + node.type);
    const parent = this.graph[node.parentID!] as IFolderNode;
    parent.children = parent.children.filter(id => nodeId != id);
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

  getAdjGraph() {
    return this.graph;
  }

  sortBy(path: string, type: 'name' | 'size') {
    const parent = this.graph[md5(path + '__folder__')] as
      | IFolderNode
      | undefined;
    if (parent === undefined) throw Error('Not such node');
    parent.children = parent.children.sort((a, b) => {
      if (type === 'name') {
        if (this.graph[a].name < this.graph[b].name) return -1;
        if (this.graph[a].name > this.graph[b].name) return 1;
      } else if (type === 'size') {
        if (this.graph[a].size < this.graph[b].size) return -1;
        if (this.graph[a].size > this.graph[b].size) return 1;
      }
      return 0;
    });
  }
}

export class FileSystemHelperV2 {
  private graph: FSData = {};

  updateGraph(graph: FSData) {
    this.graph = graph;
  }

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

  searchBFSIds(keyword: string, rootPath: string) {
    const root = md5(rootPath);
    const result: Array<string> = [];
    const queue = [root];
    const visited = new Set();
    visited.add(root);
    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentNode = this.graph[current];
      if (currentNode.name.includes(keyword)) {
        result.push(md5(currentNode.path + currentNode.type));
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
    const nodeId = md5(node.path + node.type);
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
      parent.children = parent.children.filter(id => nodeId != id);
      parent.addChildren(node);
      //delete old node reference
      delete this.graph[nodeId];
    }
    Object.assign(node, data);
  }

  deleteNode(node: IFileNode | IFolderNode) {
    const nodeId = md5(node.path + node.type);
    const parent = this.graph[node.parentID!] as IFolderNode;
    parent.children = parent.children.filter(id => nodeId != id);
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

  getAdjGraph() {
    return this.graph;
  }

  sortBy(path: string, type: 'name' | 'size') {
    const parent = this.graph[md5(path + '__folder__')] as
      | IFolderNode
      | undefined;
    if (parent === undefined) throw Error('Not such node');
    parent.children = parent.children.sort((a, b) => {
      if (type === 'name') {
        if (this.graph[a].name < this.graph[b].name) return -1;
        if (this.graph[a].name > this.graph[b].name) return 1;
      } else if (type === 'size') {
        return this.graph[a].size - this.graph[b].size;
      }
      return 0;
    });
  }
}
