import { FSData } from "../interfaces/fs-data.interface";
import { dummyFileSystem } from "./dummy-data";
import { FileNode, FolderNode } from "./node";

function injectData() {
    const fsData: FSData = {};
    Object.keys(dummyFileSystem).forEach((key) => {
      if (dummyFileSystem[key].type === "__folder__") {
        fsData[key] = new FolderNode(dummyFileSystem[key]);
      } else if (dummyFileSystem[key].type === "__file__") {
        fsData[key] = new FileNode(dummyFileSystem[key]);
      } else {
        throw new Error("Invalid node type");
      }
    });
    return fsData;
  }
  
  const fsData = injectData();
  export default fsData;
  