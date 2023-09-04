import { ETL } from '../interfaces/ETL.interface';
import { FSData } from '../interfaces/fs-data.interface';
import { FileNode, FolderNode } from './node';

export class LocalStorageETL implements ETL {
  private injectData(dummyData: any) {
    const fsData: FSData = {};
    Object.keys(dummyData).forEach(key => {
      if (dummyData[key].type === '__folder__') {
        fsData[key] = new FolderNode(dummyData[key]);
        const folderNode = fsData[key] as FolderNode;
      } else if (dummyData[key].type === '__file__') {
        fsData[key] = new FileNode(dummyData[key]);
      } else {
        throw new Error('Invalid node type');
      }
    });
    return fsData;
  }

  transform(data: any): FSData {
    let fsData: FSData = {};
    fsData = this.injectData(data);
    return fsData;
  }

  extract() {
    const data = localStorage.getItem('dummyFS');
    if (data) {
      return JSON.parse(data);
    }
    return undefined;
  }

  load(): FSData {
    let data = this.extract();
    if (data) {
      return this.transform(data);
    }
    return {};
  }
}
