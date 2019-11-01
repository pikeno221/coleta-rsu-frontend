import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemFilterPage } from './item-filter';

@NgModule({
  declarations: [
    ItemFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemFilterPage),
    TranslateModule.forChild()
  ],
  exports: [
    ItemFilterPage
  ]
})
export class ItemFilterPageModule { }
