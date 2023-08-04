import { Component } from '@angular/core';
import { FilesystemService } from '../../services/filesystem/filesystem.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchInput!: string;

  constructor(private fileSystemService: FilesystemService){}

  search(){
    if(this.searchInput){
      const currentContent = this.fileSystemService.currentContentSource.getValue();
      if(currentContent){
        const result =  this.fileSystemService.fs.searchBFS(this.searchInput, currentContent.path + '__folder__');
        this.fileSystemService.updateCurrentContent({nodes: result});
      }
    }else{
      this.fileSystemService.updateCurrentContentByPath('/');
    }
  }
}
