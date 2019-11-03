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
  data: { dataAgendada: string, dataAgendadaFim: string} = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
  currentItems: Item[] = [];
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, 
    public agendamento: AgendamentoProvider, public usuario: Usuario) {
    this.BindList();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPendentesPage');
  }

  public BindList(item?:any){
    this.currentItems = [];
    this.data.dataAgendada = item ? `${new Date(item.dataAgendada).getUTCDate()}/${new Date(item.dataAgendada).getUTCMonth()+1}/${new Date(item.dataAgendada).getUTCFullYear()}` : this.data.dataAgendada;
    this.data.dataAgendadaFim = item ? `${new Date(item.dataAgendadaFim).getUTCDate()}/${new Date(item.dataAgendadaFim).getUTCMonth()+1}/${new Date(item.dataAgendadaFim).getUTCFullYear()}` : this.data.dataAgendadaFim;
    this.agendamento.buscarTodos(this.usuario._usuario.id, this.data.dataAgendada, this.data.dataAgendadaFim, "AGUARDANDO_CONFICAMACAO").subscribe(data => {
     if(data.agendamentos){ 
      for (let index = 0; index < data.agendamentos.length; index++) {
        const element = data.agendamentos[index];
        if(element.status == 'AGUARDANDO_CONFICAMACAO'){
          this.currentItems.push(element);
        }        
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
    this.agendamento.AtualizarAgendamento(item);
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
