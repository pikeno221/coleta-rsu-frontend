import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaPendentesPage } from './lista-pendentes';

@NgModule({
  declarations: [
    ListaPendentesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaPendentesPage),
  ],
})
export class ListaPendentesPageModule {}
