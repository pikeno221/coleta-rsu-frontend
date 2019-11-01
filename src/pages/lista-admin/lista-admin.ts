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

  currentItems: Item[] = [];
  constructor(public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public agendamento: AgendamentoProvider,
    public usuario: Usuario,
    public tabs: TabsAdminPage) {
    this.BindList();
    this.currentItems = this.items.query();
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }
  /**
   * Prompt the usuario to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the usuario created one.
   */
  public BindList(){
    this.currentItems = [];
    this.agendamento.buscarTodosAdmin().subscribe(data => {
      for (let index = 0; index < data.agendamentos.length; index++) {
        const element = data.agendamentos[index];
        if(element.status == 'AGENDAMENTO_CONFIRMADO'){
          this.currentItems.push(element);
        }        
    }
    },err =>{
      this.tabs.addItem()
    });
  }
  // cancela agendamento
  public ConcluirItem(item) {
    item.status = "CONCLUIDO"
    item.usuario = item.usuario.id
    this.agendamento.AtualizarAgendamento(item)
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
    this.tabs.atualizarTodaAbas();
    //this.items.delete(item);
  }

  openItem(item: Item) {
    this.navCtrl.push('ItemAdminDetailPage', {
      item: item
    });
  }

}
