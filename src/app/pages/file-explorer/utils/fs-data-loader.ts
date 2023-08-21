import { FSData } from "../interfaces/fs-data.interface";
import { dummyData, dummyFileSystem } from "./dummy-data";
import { FileNode, FolderNode } from "./node";

function injectData(dummyData: any) {
    const fsData: FSData = {};
    Object.keys(dummyData).forEach((key) => {
      if (dummyData[key].type === "__folder__") {
        fsData[key] = new FolderNode(dummyData[key]);
        const folderNode = fsData[key] as FolderNode;
        folderNode.children = new Set(folderNode.children);
      } else if (dummyData[key].type === "__file__") {
        fsData[key] = new FileNode(dummyData[key]);
      } else {
        throw new Error("Invalid node type");
      }
    });
    return fsData;
  }
  
//const fsData = injectData(dummyFileSystem);
const data = localStorage.getItem("dummyFS");
let fsData: FSData = {};
if(data) {
  let parsedJson = JSON.parse(data);
  fsData = injectData(parsedJson);
}else{
  let parsedJson = JSON.parse(dummyData);
  fsData = injectData(parsedJson);
}
export default fsData;
