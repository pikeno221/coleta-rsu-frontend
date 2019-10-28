import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, Usuario } from '../../providers';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';
 

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  currentItems: Item[] = [];
  constructor(public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public agendamento: AgendamentoProvider,
    public usuario: Usuario,
    public tabs: TabsPage) {
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
    
    this.agendamento.buscarTodos(this.usuario._usuario.id, '123').subscribe(data => {
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
  public deleteItem(item) {
    this.agendamento.CancelarAgendamento(item.id)
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
    //this.items.delete(item);
  }
  // cria novo agendamento
  // addItem() {
  //   let addModal = this.modalCtrl.create('ItemCreatePage');
  //   addModal.onDidDismiss(item => {
  //     console.log('lista');
  //     this.agendamento.salvarAgendamento(item);
  //     var listaItemPendente = new Items();  
  //     var listaPendente = new ListaPendentesPage(this.navCtrl, listaItemPendente , this.modalCtrl, this.agendamento, this.usuario);
  //     listaPendente.BindList();
  //   })
  //   addModal.present();
  // }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
