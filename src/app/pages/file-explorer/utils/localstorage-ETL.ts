import { ETL } from '../interfaces/ETL.interface';
import { FSData } from '../interfaces/fs-data.interface';
import { FileNode, FolderNode } from './node';

const testData =
  '{ "1382b6993e9f270cb1c29833be3f5750": { "type": "__folder__", "name": "root", "path": "/", "size": 0, "date": "2019-04-07", "creatorName": "admin", "parentPath": null, "parentID": null, "children": [ "456cefdff1ee6fd5dd0b6c00473ba325", "fca652c9523bf09b5dea64c53f7f28ab", "0ce48b7451a7fc6e4b866e060a417a55", "301ac60a9c899486a61e2d8b10d98676", "d2dd8d3783d6690d6685545a5d563a6f" ] }, "456cefdff1ee6fd5dd0b6c00473ba325": { "type": "__folder__", "name": "Documents", "creatorName": "User3", "size": 3543000, "date": "2023-08-18", "parentID": "1382b6993e9f270cb1c29833be3f5750", "parentPath": "/", "path": "/Documents", "children": [ "1d8ff328314236b6db2a35cbe4c5e9c2", "c554b6e90c27d0686bfa24a234eefbb7", "8115c345ed20f14148f32fb78bfb151b" ] }, "fca652c9523bf09b5dea64c53f7f28ab": { "type": "__folder__", "name": "Pictures", "creatorName": "User2", "size": 3142000, "date": "2023-09-10", "parentID": "1382b6993e9f270cb1c29833be3f5750", "parentPath": "/", "path": "/Pictures", "children": [ "8d3af85b73c6b5f7dda7df3927b76da5", "84a2338f9a6846a001556c1da1dbd536", "c6878a26df85d85f6fe48607aae75b23", "706ebb2d68523f4ebeda292336791a4b" ] }, "0ce48b7451a7fc6e4b866e060a417a55": { "type": "__folder__", "name": "Videos", "creatorName": "User2", "size": 492852913, "date": "2023-07-11", "parentID": "1382b6993e9f270cb1c29833be3f5750", "parentPath": "/", "path": "/Videos", "children": [ "59e43450b998ee73999892ddc6f7ed86", "e40d390d2ddb3b2042bcd4014a511e20", "16d97865f39db37e8a220ef71b454c58", "b293b3e686f84f3caa8e0a69688776ee" ] }, "301ac60a9c899486a61e2d8b10d98676": { "type": "__folder__", "name": "Music", "creatorName": "User2", "size": 70423180, "date": "2023-09-18", "parentID": "1382b6993e9f270cb1c29833be3f5750", "parentPath": "/", "path": "/Music", "children": [ "cba618b71fc9315f4e010ebbd166cf7e" ] }, "1d8ff328314236b6db2a35cbe4c5e9c2": { "type": "__file__", "name": "Invoice client AB23.docx", "creatorName": "user2", "size": 760000, "date": "2023-08-18", "parentID": "456cefdff1ee6fd5dd0b6c00473ba325", "parentPath": "/Documents", "path": "/Documents/Invoice client AB23.docx" }, "c554b6e90c27d0686bfa24a234eefbb7": { "type": "__file__", "name": "Project proposal.pdf", "creatorName": "user3", "size": 2780000, "date": "2023-05-03", "parentID": "456cefdff1ee6fd5dd0b6c00473ba325", "parentPath": "/Documents", "path": "/Documents/Project proposal.pdf" }, "8115c345ed20f14148f32fb78bfb151b": { "type": "__file__", "name": "Notes.txt", "creatorName": "User2", "size": 3000, "date": "2023-08-11", "parentID": "456cefdff1ee6fd5dd0b6c00473ba325", "parentPath": "/Documents", "path": "/Documents/Notes.txt" }, "8d3af85b73c6b5f7dda7df3927b76da5": { "type": "__file__", "name": "family picnic.png", "creatorName": "user2", "size": 767000, "date": "2023-09-10", "parentID": "fca652c9523bf09b5dea64c53f7f28ab", "parentPath": "/Pictures", "path": "/Pictures/family picnic.png" }, "84a2338f9a6846a001556c1da1dbd536": { "type": "__file__", "name": "cute kitten.gif", "creatorName": "user3", "size": 641000, "date": "2023-09-01", "parentID": "fca652c9523bf09b5dea64c53f7f28ab", "parentPath": "/Pictures", "path": "/Pictures/cute kitten.gif" }, "c6878a26df85d85f6fe48607aae75b23": { "type": "__file__", "name": "tropical paradise.png", "creatorName": "user3", "size": 1278000, "date": "2023-07-13", "parentID": "fca652c9523bf09b5dea64c53f7f28ab", "parentPath": "/Pictures", "path": "/Pictures/tropical paradise.png" }, "706ebb2d68523f4ebeda292336791a4b": { "type": "__file__", "name": "winter wonderland.jpeg", "creatorName": "user3", "size": 456000, "date": "2023-05-26", "parentID": "fca652c9523bf09b5dea64c53f7f28ab", "parentPath": "/Pictures", "path": "/Pictures/winter wonderland.jpeg" }, "59e43450b998ee73999892ddc6f7ed86": { "type": "__file__", "name": "Summer v acation 2023.mp4", "creatorName": "user3", "size": 270378000, "date": "2023-07-11", "parentID": "0ce48b7451a7fc6e4b866e060a417a55", "parentPath": "/Videos", "path": "/Videos/Summer v acation 2023.mp4" }, "e40d390d2ddb3b2042bcd4014a511e20": { "type": "__file__", "name": "Epic Adventure Trailer.mov", "creatorName": "user2", "size": 50545000, "date": "2022-09-18", "parentID": "0ce48b7451a7fc6e4b866e060a417a55", "parentPath": "/Videos", "path": "/Videos/Epic Adventure Trailer.mov" }, "16d97865f39db37e8a220ef71b454c58": { "type": "__file__", "name": "Cooking_Tutorial_Part1.mov", "creatorName": "user4", "size": 156484500, "date": "2023-03-30", "parentID": "0ce48b7451a7fc6e4b866e060a417a55", "parentPath": "/Videos", "path": "/Videos/Cooking_Tutorial_Part1.mov" }, "b293b3e686f84f3caa8e0a69688776ee": { "type": "__file__", "name": "Funny_Cat_Video.mp4", "creatorName": "user3", "size": 15445413, "date": "2023-01-12", "parentID": "0ce48b7451a7fc6e4b866e060a417a55", "parentPath": "/Videos", "path": "/Videos/Funny_Cat_Video.mp4" }, "cba618b71fc9315f4e010ebbd166cf7e": { "type": "__folder__", "name": "Soulful dnb", "creatorName": "user4", "size": 70423180, "date": "2023-09-18", "parentID": "301ac60a9c899486a61e2d8b10d98676", "parentPath": "/Music", "path": "/Music/Soulful dnb", "children": [ "ce6d7bbf481c83cd1cd4c86d7082a51f", "4ff5b3e6185988f4a5577570ff38d987", "83d4d8182498e7134612f59681cfef9c" ] }, "ce6d7bbf481c83cd1cd4c86d7082a51f": { "type": "__file__", "name": "Visages - Emotions Software.wav", "creatorName": "user4", "size": 6454560, "date": "2023-05-15", "parentID": "cba618b71fc9315f4e010ebbd166cf7e", "parentPath": "/Music/Soulful dnb", "path": "/Music/Soulful dnb/Visages - Emotions Software.wav" }, "4ff5b3e6185988f4a5577570ff38d987": { "type": "__file__", "name": "Alix perez - Evermore.mp3", "creatorName": "user4", "size": 9515620, "date": "2023-04-25", "parentID": "cba618b71fc9315f4e010ebbd166cf7e", "parentPath": "/Music/Soulful dnb", "path": "/Music/Soulful dnb/Alix perez - Evermore.mp3" }, "83d4d8182498e7134612f59681cfef9c": { "type": "__file__", "name": "GLXY & Halogenix - Unconditional.flac", "creatorName": "user4", "size": 54453000, "date": "2023-09-18", "parentID": "cba618b71fc9315f4e010ebbd166cf7e", "parentPath": "/Music/Soulful dnb", "path": "/Music/Soulful dnb/GLXY & Halogenix - Unconditional.flac" }, "d2dd8d3783d6690d6685545a5d563a6f": { "type": "__folder__", "name": "Folder 1", "creatorName": "user3", "size": 0, "date": "2023-09-18", "parentID": "1382b6993e9f270cb1c29833be3f5750", "parentPath": "/", "path": "/Folder 1", "children": [ "65ce7c79e02061a0e0afffeaf3dedc84" ] }, "65ce7c79e02061a0e0afffeaf3dedc84": { "type": "__folder__", "name": "Folder 2", "creatorName": "user3", "size": 0, "date": "2023-09-18", "parentID": "d2dd8d3783d6690d6685545a5d563a6f", "parentPath": "/Folder 1", "path": "/Folder 1/Folder 2", "children": [ "346e77227a7a61c0a9a607995c11d7e3" ] }, "346e77227a7a61c0a9a607995c11d7e3": { "type": "__folder__", "name": "Folder 3", "creatorName": "user3", "size": 0, "date": "2023-09-18", "parentID": "65ce7c79e02061a0e0afffeaf3dedc84", "parentPath": "/Folder 1/Folder 2", "path": "/Folder 1/Folder 2/Folder 3", "children": [ "a76f2adc856bee046386255ce53d8d25" ] }, "a76f2adc856bee046386255ce53d8d25": { "type": "__folder__", "name": "Folder 4", "creatorName": "user3", "size": 0, "date": "2023-09-18", "parentID": "346e77227a7a61c0a9a607995c11d7e3", "parentPath": "/Folder 1/Folder 2/Folder 3", "path": "/Folder 1/Folder 2/Folder 3/Folder 4", "children": [ "8a27d3ec2c9bc698ce1bed17ff0e037b" ] }, "8a27d3ec2c9bc698ce1bed17ff0e037b": { "type": "__folder__", "name": "Folder 5", "creatorName": "user3", "size": 0, "date": "2023-09-18", "parentID": "a76f2adc856bee046386255ce53d8d25", "parentPath": "/Folder 1/Folder 2/Folder 3/Folder 4", "path": "/Folder 1/Folder 2/Folder 3/Folder 4/Folder 5", "children": [] } }';

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
