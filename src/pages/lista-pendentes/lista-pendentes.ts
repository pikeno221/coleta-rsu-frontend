import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items } from '../../providers';


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
  currentItems: Item[];
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPendentesPage');
  }

  public addItemPendente(item){
    debugger;
    this.items.add(item);
  }

  public addItem(){
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item && item.situacao == 'pendente') {
        this.items.add(item);
      }
    })
    addModal.present();
  }
}
