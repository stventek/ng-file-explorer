import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './components/pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FileExplorerModule } from './file-explorer/file-explorer.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomepageModule } from './homepage/homepage.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    PagesComponent,
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FileExplorerModule,
    HomepageModule,
    FontAwesomeModule,
  ],
  exports: [PagesComponent],
})
export class PagesModule {}
