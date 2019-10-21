import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListaCanceladasPage } from './lista-canceladas';

@NgModule({
  declarations: [
    ListaCanceladasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaCanceladasPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListaCanceladasPage
  ]
})
export class ListaCanceladasModule { }
