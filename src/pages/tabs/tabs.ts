import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root, Tab4Root } from '../';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { ListaPendentesPage } from '../lista-pendentes/lista-pendentes';
import { Usuario, Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;

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
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
        if (item != undefined){
      this.agendamento.salvarAgendamento(item);
      var listaItemPendente = new Items();  
      var listaPendente = new ListaPendentesPage(this.navCtrl, listaItemPendente , this.modalCtrl, this.agendamento, this.usuario);
      listaPendente.BindList();
    }
    })
    addModal.present();
  }
}
