import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { InicioPage } from './inicio';

@NgModule({
  declarations: [
    InicioPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioPage),
    TranslateModule.forChild()
  ],
  exports: [
    InicioPage
  ]
})
export class ItemCreatePageModule { }
