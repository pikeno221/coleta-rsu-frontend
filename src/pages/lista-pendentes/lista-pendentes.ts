import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
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
  currentItems: Item[] = [];
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, 
    public agendamento: AgendamentoProvider, public usuario: Usuario) {
    this.BindList();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPendentesPage');
  }

  public BindList()
  {
    this.agendamento.buscarTodos(this.usuario._usuario.id, '123').subscribe(data => {
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
