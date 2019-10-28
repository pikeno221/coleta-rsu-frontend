import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAdminPendentesPage } from './lista-admin-pendentes';

@NgModule({
  declarations: [
    ListaAdminPendentesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAdminPendentesPage),
  ],
})
export class ListaAdminPendentesPageModule {}
