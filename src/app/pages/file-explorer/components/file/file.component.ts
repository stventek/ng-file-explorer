import { Component, Input } from '@angular/core';
import { IFileNode } from '../../interfaces/node.interface';
import { faImage, faFile, faFileLines, faFilePdf, faFileVideo, faFileAudio } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  @Input() node!: IFileNode;
  faImage = faImage;
  faFile = faFile;
  faFileLines = faFileLines;
  faFilePdf = faFilePdf;
  faFileVideo = faFileVideo;
  faFileAudio = faFileAudio;
  isContextMenuOpen = false;
  x = 0;
  y = 0;

  getIcon(){
    const extension = this.node.name.split('.').pop()!;
    if(['png', 'jpg', 'jpeg', 'webp'].includes(extension)) return this.faImage;
    if('pdf' === extension) return this.faFilePdf;
    if('txt' === extension) return this.faFileLines;
    if([
      "mp4",
      "mov",
      "avi",
      "mkv",
      "wmv",
      "flv",
      "webm",
      "m4v",
    ].includes(extension)) return this.faFileVideo;
    if([
      "mp3",
      "wav",
      "ogg",
      "flac",
      "aac",
      "wma",
      "m4a",
      "opus",
    ].includes(extension)) return this.faFileAudio;
    return faFile;
  }

  openContextMenu(event: MouseEvent){
    event.preventDefault();
    this.x = event.x;
    this.y = event.y;
    this.isContextMenuOpen = true;
  }

  onClickedOutside(e: any){
    this.isContextMenuOpen = false;
  }
}
