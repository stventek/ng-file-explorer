import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { NavigationPaneComponent } from './components/navigation-pane/navigation-pane.component';
import { ContentPaneComponent } from './components/content-pane/content-pane.component';
import { FilesystemService } from './services/filesystem/filesystem.service';
import { RouterModule } from '@angular/router';
import { FileComponent } from './components/file/file.component';
import { FolderComponent } from './components/folder/folder.component';

@NgModule({
  declarations: [
    FileExplorerComponent,
    NavigationPaneComponent,
    ContentPaneComponent,
    FileComponent,
    FolderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FileExplorerComponent
  ],
  providers: [FilesystemService]
})
export class FileExplorerModule { }
