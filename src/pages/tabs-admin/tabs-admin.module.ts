import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TabsAdminPage } from './tabs-admin';

@NgModule({
  declarations: [
    TabsAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsAdminPage),
    TranslateModule.forChild()
  ],
  exports: [
    TabsAdminPage
  ]
})
export class TabsAdminPageModule { }
