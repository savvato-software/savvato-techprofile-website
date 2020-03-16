import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillsMatrixPageRoutingModule } from './skills-matrix-routing.module';

import { SkillsMatrixPage } from './skills-matrix.page';

import { SavvatoTechprofileUserHistoricalViewModule } from '@savvato-software/savvato-techprofile-user-historical-view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillsMatrixPageRoutingModule,
    SavvatoTechprofileUserHistoricalViewModule
  ],
  declarations: [SkillsMatrixPage]
})
export class SkillsMatrixPageModule {}
