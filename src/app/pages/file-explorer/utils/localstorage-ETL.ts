import { ETL } from '../interfaces/ETL.interface';
import { FSData } from '../interfaces/fs-data.interface';
import { FileNode, FolderNode } from './node';

const testData =
  '{"1382b6993e9f270cb1c29833be3f5750":{"type":"__folder__","name":"root","path":"/","size":0,"date":"2019-04-07","creatorName":"admin","parentPath":null,"parentID":null,"children":["9b6739960c1ac83251046da2c718019b","147d0ef33fe657ce53a83de6a630473d","a55cfa9e1bf87138edd25c4b1553104d","5f2b4d35489a8617e574060b19b7cad9","ab7e413a3798155e37a9361140522e39","891debd77d0bc40d30ff7d7e6c628e9f"]},"9b6739960c1ac83251046da2c718019b":{"type":"__folder__","name":"apps","creatorName":"Shubham Singh","size":223,"date":"2019-04-29","parentID":"1382b6993e9f270cb1c29833be3f5750","parentPath":"/","path":"/apps","children":[]},"147d0ef33fe657ce53a83de6a630473d":{"type":"__folder__","name":"pictures","creatorName":"Shubham Singh","size":23,"date":"2019-04-29","parentID":"1382b6993e9f270cb1c29833be3f5750","parentPath":"/","path":"/pictures","children":[]},"a55cfa9e1bf87138edd25c4b1553104d":{"type":"__folder__","name":"videos","creatorName":"Shubham Singh","size":0,"date":"2019-04-29","parentID":"1382b6993e9f270cb1c29833be3f5750","parentPath":"/","path":"/videos","children":[]},"5f2b4d35489a8617e574060b19b7cad9":{"type":"__folder__","name":"docs","creatorName":"Shubham Singh","size":233,"date":"2019-04-29","parentID":"1382b6993e9f270cb1c29833be3f5750","parentPath":"/","path":"/docs","children":["2d03459789f153918dfc0be413fe9987","8f7c5959dbb088c0aef8b145dbdf6e43","579c51eec02e43b4dfad314e05365fe4","635e64a5f9282af18f2f7d93bfaa4095","c3aba6a7a12784a3348ba307c57e71d8","952f7e5ea7576ee5f5012d5f0a896eee","f8b6bd8af6cfc59df3c4b94953bc2fb4","584ac6bfe8f70c9d2afd3a3cac4a2287","78cd50c57caa986858e49ba6a2ae1dac","22056b147f0c43f6e0f714b8ca4a0fc6","6161eaed93e28867a9bac1591c2daa93"]},"ab7e413a3798155e37a9361140522e39":{"type":"__file__","name":"a.pdf","creatorName":"Shubham Singh","size":234,"date":"2019-04-29","parentID":"1382b6993e9f270cb1c29833be3f5750","parentPath":"/","path":"/a.pdf"},"891debd77d0bc40d30ff7d7e6c628e9f":{"type":"__file__","name":"b.jpg","creatorName":"Shubham Singh","size":234,"date":"2019-04-29","parentID":"1382b6993e9f270cb1c29833be3f5750","parentPath":"/","path":"/b.jpg"},"2d03459789f153918dfc0be413fe9987":{"type":"__folder__","name":"work","creatorName":"Shubham Singh","size":200,"date":"2019-04-29","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/work","children":["b42eff45517edc2e543b3d2750bd08c3","00ce12a7746322ce403e17992674f81b","ee8b872f47eec203143b68b91245d92f"]},"8f7c5959dbb088c0aef8b145dbdf6e43":{"type":"__file__","name":"c.pdf","creatorName":"Shubham Singh","size":200,"date":"2019-04-29","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/c.pdf"},"579c51eec02e43b4dfad314e05365fe4":{"type":"__file__","name":"d.docx","creatorName":"Shubham Singh","size":235,"date":"2019-04-29","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/d.docx"},"b42eff45517edc2e543b3d2750bd08c3":{"type":"__file__","name":"e.pdf","creatorName":"Shubham Singh","size":0,"date":"2019-04-29","parentID":"2d03459789f153918dfc0be413fe9987","parentPath":"/docs/work","path":"/docs/work/e.pdf"},"00ce12a7746322ce403e17992674f81b":{"type":"__file__","name":"f.ts","creatorName":"Shubham Singh","size":235,"date":"2019-04-29","parentID":"2d03459789f153918dfc0be413fe9987","parentPath":"/docs/work","path":"/docs/work/f.ts"},"635e64a5f9282af18f2f7d93bfaa4095":{"type":"__file__","name":"test.mp3","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/test.mp3"},"c3aba6a7a12784a3348ba307c57e71d8":{"type":"__file__","name":"test.mp4","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/test.mp4"},"952f7e5ea7576ee5f5012d5f0a896eee":{"type":"__file__","name":"test.txt","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/test.txt"},"f8b6bd8af6cfc59df3c4b94953bc2fb4":{"type":"__file__","name":"test.flac","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/test.flac"},"584ac6bfe8f70c9d2afd3a3cac4a2287":{"type":"__file__","name":"test file with space.jpeg","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/test file with space.jpeg"},"78cd50c57caa986858e49ba6a2ae1dac":{"type":"__folder__","name":"long name folder example","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/long name folder example","children":[]},"22056b147f0c43f6e0f714b8ca4a0fc6":{"type":"__file__","name":"no extension file","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/no extension file"},"6161eaed93e28867a9bac1591c2daa93":{"type":"__file__","name":"test.jar","creatorName":"test","size":0,"date":"2023-08-08","parentID":"5f2b4d35489a8617e574060b19b7cad9","parentPath":"/docs","path":"/docs/test.jar"},"ee8b872f47eec203143b68b91245d92f":{"type":"__folder__","name":"test","creatorName":"dasdsa","size":0,"date":"2023-08-31","parentID":"2d03459789f153918dfc0be413fe9987","parentPath":"/docs/work","path":"/docs/work/test","children":["d80bfc964e5cc4be6f5c493544e1914b"]},"d80bfc964e5cc4be6f5c493544e1914b":{"type":"__folder__","name":"test2","creatorName":"dsad","size":0,"date":"2023-08-31","parentID":"ee8b872f47eec203143b68b91245d92f","parentPath":"/docs/work/test","path":"/docs/work/test/test2","children":[]}}';

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
    } else {
      return JSON.parse(testData);
    }
  }

  load(): FSData {
    let data = this.extract();
    if (data) {
      return this.transform(data);
    }
    return {};
  }
}
