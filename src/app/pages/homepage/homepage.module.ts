import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [HomepageComponent],
})
export class HomepageModule {}
