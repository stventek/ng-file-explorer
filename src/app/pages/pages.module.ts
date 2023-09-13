import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './components/pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FileExplorerModule } from './file-explorer/file-explorer.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [PagesComponent, NotFoundComponent],
  imports: [CommonModule, PagesRoutingModule, FileExplorerModule],
  exports: [PagesComponent],
})
export class PagesModule {}
