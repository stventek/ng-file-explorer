import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileExplorerComponent } from './file-explorer/components/file-explorer/file-explorer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomepageComponent } from './homepage/components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'local',
    children: [{ path: '**', component: FileExplorerComponent }],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
