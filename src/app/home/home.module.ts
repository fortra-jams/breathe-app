import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HomePage } from './home.page';
import { HomeResolver} from './home.resolver';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        resolve: {
          data: HomeResolver
        }
      }
    ]) ,
    ChartsModule
  ],
  
  declarations: [HomePage],
  providers: [
    HomeResolver
  ]

})
export class HomePageModule {}
