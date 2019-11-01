import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, Usuario } from '../../providers';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';
import { TabsAdminPage } from '../tabs-admin/tabs-admin';


/**
 * Generated class for the ListaPendentesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-pendentes',
  templateUrl: 'lista-admin-pendentes.html',
})
export class ListaAdminPendentesPage {
  currentItems: Item[] = [];
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, 
    public agendamento: AgendamentoProvider, public usuario: Usuario, public tabs:TabsAdminPage) {
    this.BindList();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAdminPendentesPage');
  }

  public BindList(){
    this.currentItems = [];
    this.agendamento.buscarTodosAdmin().subscribe(data => {
      for (let index = 0; index < data.agendamentos.length; index++) {
        const element = data.agendamentos[index];
        if(element.status == 'AGUARDANDO_CONFICAMACAO'){
          this.currentItems.push(element);
        }        
    }
    },err =>{
      //this.tabs.addItem()
    });
  }
  public openItem(item: Item) {
    this.navCtrl.push('ItemAdminDetailPage', {
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

  Confirmar(item){
    item.status = "AGENDAMENTO_CONFIRMADO"
    item.usuario = item.usuario.id
    this.agendamento.CancelarAgendamento(item);
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
    this.tabs.atualizarTodaAbas();
  }
  
}
