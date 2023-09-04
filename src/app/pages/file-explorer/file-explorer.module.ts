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
import { FileContextMenuComponent } from './components/file-context-menu/file-context-menu.component';
import { FolderContextMenuComponent } from './components/folder-context-menu/folder-context-menu.component';
import { FilePropertiesComponent } from './components/file-properties/file-properties.component';
import { FolderPropertiesComponent } from './components/folder-properties/folder-properties.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlaceholderPropertiesComponent } from './components/placeholder-properties/placeholder-properties.component';
import { FilePropertiesModalComponent } from './components/file-properties-modal/file-properties-modal.component';
import { FolderPropertiesModalComponent } from './components/folder-properties-modal/folder-properties-modal.component';
import { RenameNodeModalComponent } from './components/rename-node-modal/rename-node-modal.component';
import { CreateFolderModalComponent } from './components/create-folder-modal/create-folder-modal.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';

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
    NavigationBarMainComponent,
    FileContextMenuComponent,
    FolderContextMenuComponent,
    FilePropertiesComponent,
    FolderPropertiesComponent,
    PlaceholderPropertiesComponent,
    FilePropertiesModalComponent,
    FolderPropertiesModalComponent,
    RenameNodeModalComponent,
    CreateFolderModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
  exports: [FileExplorerComponent],
  providers: [FilesystemService, LocalStorageService],
})
export class FileExplorerModule {}
