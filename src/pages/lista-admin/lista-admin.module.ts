import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaAdminPage } from './lista-admin';

@NgModule({
  declarations: [
    ListaAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAdminPage),
  ],
})
export class ListaAdminPageModule {}
