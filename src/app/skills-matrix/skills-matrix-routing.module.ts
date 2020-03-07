import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsMatrixPage } from './skills-matrix.page';

const routes: Routes = [
  {
    path: '',
    component: SkillsMatrixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsMatrixPageRoutingModule {}
