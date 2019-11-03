import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ModalController, Select } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, Usuario } from '../../providers';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the ListaPendentesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-pendentes',
  templateUrl: 'lista-pendentes.html',
})
export class ListaPendentesPage {
  data: { dataAgendada: string, dataAgendadaFim: string } = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
  currentItems: Item[] = [];
  hideMe: boolean;

  @ViewChild('mySelect') selectRef: Select;
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,
    public agendamento: AgendamentoProvider, public usuario: Usuario) {
    this.hideMe = true;
    this.BindList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPendentesPage');
  }

  public BindList() {
    this.agendamento.buscarTodos(this.usuario._usuario.id, this.data.dataAgendada, this.data.dataAgendadaFim, "AGUARDANDO_CONFICAMACAO").subscribe(data => {
      if (data.agendamentos != null) {
        for (let index = 0; index < data.agendamentos.length; index++) {
          const element = data.agendamentos[index];
          if (element.status == 'AGUARDANDO_CONFICAMACAO') {
            console.log(element);
            this.currentItems.push(element);
          }
        }
      }
    }, err => {
      //this.tabs.addItem()
    });
  }

  public showTodayRouteModal() {
    this.selectRef.open();
  }


  public openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  // cancela agendamento
  public deleteItem(item) {

    console.log(item)
    item.status = "CANCELADO"
    item.usuario = item.usuario.id
    this.agendamento.CancelarAgendamento(item);
    this.currentItems.splice(this.currentItems.indexOf(item), 1);


  }

  public redirecionarMapa(items) {
    console.log(items);


  }

  onChange($event) {
    console.log('ok event');
    console.log($event);
    let enderecos: string [];
    enderecos = $event;
    console.log(enderecos);
    this.navCtrl.push('MapaPage', {
      enderecos
    });
  }
  // cria novo agendamento
  // public addItem(){
  //   let addModal = this.modalCtrl.create('ItemCreatePage');
  //   console.log('lista pendente');
  //   addModal.onDidDismiss(item => {
  //     this.agendamento.salvarAgendamento(item);
  //     this.BindList();  
  //     //this.items.add(item);
  //   })
  //   addModal.present();
  // }
}
