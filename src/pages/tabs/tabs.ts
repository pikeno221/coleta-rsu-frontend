import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { ListaPendentesPage } from '../lista-pendentes/lista-pendentes';
import { Usuario, Items } from '../../providers';
import { ListaPage } from '../lista/lista';
import { ListaCanceladasPage } from '../lista-canceladas/lista-canceladas';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, 
    public translateService: TranslateService, 
    public agendamento: AgendamentoProvider,
    public modalCtrl: ModalController,
    public usuario: Usuario) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = 'Confirmados';
      this.tab2Title = 'Pendentes';
      this.tab3Title = 'Cancelados';
    });
  }
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      this.agendamento.salvarAgendamento(item);
      var listaItemPendente = new Items();  
      //var listaPendente = new ListaPendentesPage(this.navCtrl, listaItemPendente , this.modalCtrl, this.agendamento, this.usuario);
      debugger;
      let teste = this.navCtrl.getAllChildNavs()
      if (teste[0]._tabs[1]._views){
        teste[0]._tabs[1]._views[0].instance.BindList()
      }
      //;
    })
    addModal.present();
  }

  
}
