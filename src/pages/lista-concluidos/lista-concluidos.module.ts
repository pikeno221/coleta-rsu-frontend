import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaConcluidosPage } from './lista-concluidos';

@NgModule({
  declarations: [
    ListaConcluidosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaConcluidosPage),
  ],
})
export class ListaConcluidosPageModule {}
