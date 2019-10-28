import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListaAdminCanceladasPage } from './lista-admin-canceladas';

@NgModule({
  declarations: [
    ListaAdminCanceladasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaAdminCanceladasPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListaAdminCanceladasPage
  ]
})
export class ListaAdminCanceladasModule { }
