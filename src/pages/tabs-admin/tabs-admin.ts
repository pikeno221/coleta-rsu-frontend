import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { Tab1RootAdmin, Tab2RootAdmin, Tab3RootAdmin, Tab4RootAdmin } from '..';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { ListaPendentesPage } from '../lista-pendentes/lista-pendentes';
import { Usuario, Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs-admin.html'
})
export class TabsAdminPage {
  tab1RootAdmin: any = Tab1RootAdmin;
  tab2RootAdmin: any = Tab2RootAdmin;
  tab3RootAdmin: any = Tab3RootAdmin;
  tab4RootAdmin: any = Tab4RootAdmin;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";
  tab4Title = " ";

  constructor(public navCtrl: NavController, 
    public translateService: TranslateService, 
    public agendamento: AgendamentoProvider,
    public modalCtrl: ModalController,
    public usuario: Usuario) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE']).subscribe(values => {
      this.tab1Title = 'Confirmados';
      this.tab2Title = 'Pendentes';
      this.tab3Title = 'Cancelados';
      this.tab4Title = 'Concluido';
    });
  }
 
  atualizarTodaAbas(){
    debugger;
    let tabs = this.navCtrl.getAllChildNavs()
        if (tabs[0]._tabs[0]._views && tabs[0]._tabs[0]._views.length > 0){
          tabs[0]._tabs[0]._views[0].instance.BindList()
        }
        if (tabs[0]._tabs[1]._views && tabs[0]._tabs[1]._views.length > 0){
          tabs[0]._tabs[1]._views[0].instance.BindList()
        }
        if (tabs[0]._tabs[2]._views && tabs[0]._tabs[2]._views.length > 0){
          tabs[0]._tabs[2]._views[0].instance.BindList()
        }
        if (tabs[0]._tabs[3]._views && tabs[0]._tabs[3]._views.length > 0){
          tabs[0]._tabs[3]._views[0].instance.BindList()
        }
  }
  filterItem() {
    let addModal = this.modalCtrl.create('ItemFilterPage');
    addModal.onDidDismiss(item => {
        debugger;
        let tabs = this.navCtrl.getAllChildNavs()
        if (tabs[0]._tabs[0]._views && tabs[0]._tabs[0]._views.length > 0){
          tabs[0]._tabs[0]._views[0].instance.BindList(item)
        }
        if (tabs[0]._tabs[1]._views && tabs[0]._tabs[1]._views.length > 0){
          tabs[0]._tabs[1]._views[0].instance.BindList(item)
        }
        if (tabs[0]._tabs[2]._views && tabs[0]._tabs[2]._views.length > 0){
          tabs[0]._tabs[2]._views[0].instance.BindList(item)
        }
        if (tabs[0]._tabs[3]._views && tabs[0]._tabs[3]._views.length > 0){
          tabs[0]._tabs[3]._views[0].instance.BindList(item)
        }
    })
    addModal.present();
  }
}
