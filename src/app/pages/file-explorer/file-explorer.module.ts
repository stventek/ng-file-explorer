import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { NavigationPaneComponent } from './components/navigation-pane/navigation-pane.component';
import { ContentPaneComponent } from './components/content-pane/content-pane.component';
import { FilesystemService } from './services/filesystem/filesystem.service';
import { RouterModule } from '@angular/router';
import { FileComponent } from './components/file/file.component';
import { FolderComponent } from './components/folder/folder.component';
import { NavigationFolderComponent } from './components/navigation-folder/navigation-folder.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationBarMainComponent } from './components/navigation-bar-main/navigation-bar-main.component';

@NgModule({
  declarations: [
    FileExplorerComponent,
    NavigationPaneComponent,
    ContentPaneComponent,
    FileComponent,
    FolderComponent,
    NavigationFolderComponent,
    SearchComponent,
    NavigationBarComponent,
    NavigationBarMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    FileExplorerComponent
  ],
  providers: [FilesystemService]
})
export class FileExplorerModule { }
