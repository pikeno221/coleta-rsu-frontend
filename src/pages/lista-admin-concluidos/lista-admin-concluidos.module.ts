import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAdminConcluidosPage } from './lista-admin-concluidos';

@NgModule({
  declarations: [
    ListaAdminConcluidosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAdminConcluidosPage),
  ],
})
export class ListaConcluidosPageModule {}
