import { faImage, faFile, faFileLines, faFilePdf, faFileVideo, faFileAudio } from '@fortawesome/free-solid-svg-icons';

export function getIcon(name: string){
    const extension = name.split('.').pop()!;
    if(['png', 'jpg', 'jpeg', 'webp'].includes(extension)) return faImage;
    if('pdf' === extension) return faFilePdf;
    if('txt' === extension) return faFileLines;
    if([
      "mp4",
      "mov",
      "avi",
      "mkv",
      "wmv",
      "flv",
      "webm",
      "m4v",
    ].includes(extension)) return faFileVideo;
    if([
      "mp3",
      "wav",
      "ogg",
      "flac",
      "aac",
      "wma",
      "m4a",
      "opus",
    ].includes(extension)) return faFileAudio;
    return faFile;
  }