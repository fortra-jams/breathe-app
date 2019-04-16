import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AlltaskPage } from './alltask.page';
import { AlltaskResolver } from './alltask.resolver';

const routes: Routes = [
  {
    path: '',
    component: AlltaskPage,
    resolve: {
      data: AlltaskResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlltaskPage],
  providers: [
    AlltaskResolver
  ]
})
export class AlltaskPageModule {}
