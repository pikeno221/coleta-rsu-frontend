import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MapaPage } from './mapa';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaPage),
    TranslateModule.forChild()
  ],
  exports: [
    MapaPage
  ]
})
export class MapaPageModule { }
