import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';
import { Usuario } from '../../providers';
import { Item } from '../../models/item';

/**
 * Generated class for the ListaConcluidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-concluidos',
  templateUrl: 'lista-concluidos.html',
})
export class ListaConcluidosPage {
  data: { dataAgendada: string, dataAgendadaFim: string } = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public usuario: Usuario, public agendamento: AgendamentoProvider, public tabs: TabsPage) {
  }
  currentItems: Item[] = [];
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaConcluidosPage');
  }

  public BindList() {
    this.agendamento.buscarTodos(this.usuario._usuario.id, this.data.dataAgendada, this.data.dataAgendadaFim, "CONCLUIDO").subscribe(data => {
      if (data.agendamentos != null) {
        for (let index = 0; index < data.agendamentos.length; index++) {
          const element = data.agendamentos[index];
          if (element.status == 'CONCLUIDO') {
            this.currentItems.push(element);
          }
        }
      }
    }, err => {
      this.tabs.addItem()
    });
  }

  public openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
}
