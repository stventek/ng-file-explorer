import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './components/pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FileExplorerModule } from './file-explorer/file-explorer.module';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FileExplorerModule
  ],
  exports: [PagesComponent]
})
export class PagesModule { }
