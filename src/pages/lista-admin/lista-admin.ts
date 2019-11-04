import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, Usuario } from '../../providers';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsAdminPage } from '../tabs-admin/tabs-admin';


@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista-admin.html',
})

export class ListaAdminPage {
  data: { dataAgendada: string, dataAgendadaFim: string } = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
  currentItems: Item[] = [];
  constructor(public navCtrl: NavController,
    public items: Items,
    public modalCtrl: ModalController,
    public agendamento: AgendamentoProvider,
    public usuario: Usuario,
    public tabs: TabsAdminPage) {
    this.BindList();
    //this.currentItems = this.items.query();
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

  }
  ionViewWillEnter() {
    this.BindList();
  }
  /**
   * Prompt the usuario to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the usuario created one.
   */
  public BindList(item?: any) {
    this.currentItems = [];
    this.data.dataAgendada = item ? `${new Date(item.dataAgendada).getUTCDate()}/${new Date(item.dataAgendada).getUTCMonth() + 1}/${new Date(item.dataAgendada).getUTCFullYear()}` : this.data.dataAgendada;
    this.data.dataAgendadaFim = item ? `${new Date(item.dataAgendadaFim).getUTCDate()}/${new Date(item.dataAgendadaFim).getUTCMonth() + 1}/${new Date(item.dataAgendadaFim).getUTCFullYear()}` : this.data.dataAgendadaFim;

    this.agendamento.buscarTodosAdmin(this.data.dataAgendada, this.data.dataAgendadaFim, "AGENDAMENTO_CONFIRMADO").subscribe(data => {
      if (data.agendamentos) {
        for (let index = 0; index < data.agendamentos.length; index++) {
          const element = data.agendamentos[index];
          if (element.status == 'AGENDAMENTO_CONFIRMADO') {
            this.currentItems.push(element);
          }
        }
      }

    }, err => {

    });
  }
  // cancela agendamento
  public ConcluirItem(item) {
    item.status = "CONCLUIDO";
    item.usuario = item.usuario.id;
    console.log('pre', this.currentItems);
    this.agendamento.AtualizarAgendamento(item);
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
    console.log('pos', this.currentItems);
    this.BindList();
    

  }

  openItem(item: Item) {
    this.navCtrl.push('ItemAdminDetailPage', {
      item: item
    });
  }

}
