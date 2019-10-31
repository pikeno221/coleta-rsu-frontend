import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemAdminDetailPage } from './item-admin-detail';

@NgModule({
  declarations: [
    ItemAdminDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemAdminDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    ItemAdminDetailPage
  ]
})
export class ItemDetailPageModule { }
