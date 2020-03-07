import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerPathPage } from './career-path.page';

const routes: Routes = [
  {
    path: '',
    component: CareerPathPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerPathPageRoutingModule {}
