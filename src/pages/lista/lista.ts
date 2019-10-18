import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers';
import { ListaPendentesPage } from '../lista-pendentes/lista-pendentes';

 

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  currentItems: Item[];
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
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
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item && item.situacao == 'confirmado') {
        this.items.add(item);
      }else if(item.situacao == 'pendente'){
      var listaItemPendente = new Items();  
      var listaPendente = new ListaPendentesPage(this.navCtrl, listaItemPendente , this.modalCtrl);
      listaPendente.addItemPendente(item);
      }
    })
    addModal.present();
  }
  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
