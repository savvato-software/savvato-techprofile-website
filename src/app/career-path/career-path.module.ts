import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerPathPageRoutingModule } from './career-path-routing.module';

import { CareerPathPage } from './career-path.page';

import { SavvatoCareerpathComponentModule } from '@savvato-software/savvato-careerpath-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareerPathPageRoutingModule,
    SavvatoCareerpathComponentModule
  ],
  declarations: [CareerPathPage]
})
export class CareerPathPageModule {}
