import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';
import { Usuario, Items } from '../../providers';
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
  data: { dataAgendada: string, dataAgendadaFim: string} = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
  currentItems: Item[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public usuario: Usuario, public agendamento: AgendamentoProvider, public tabs:TabsPage, public items: Items,) {
    this.BindList();
    //this.currentItems = this.items.query();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaConcluidosPage');
  }

  public BindList(item?:any){
    this.currentItems = [];
    this.data.dataAgendada = item ? `${new Date(item.dataAgendada).getUTCDate()}/${new Date(item.dataAgendada).getUTCMonth()+1}/${new Date(item.dataAgendada).getUTCFullYear()}` : this.data.dataAgendada;
    this.data.dataAgendadaFim = item ? `${new Date(item.dataAgendadaFim).getUTCDate()}/${new Date(item.dataAgendadaFim).getUTCMonth()+1}/${new Date(item.dataAgendadaFim).getUTCFullYear()}` : this.data.dataAgendadaFim;

      this.agendamento.buscarTodos(this.usuario._usuario.id,  this.data.dataAgendada, this.data.dataAgendadaFim,"CONCLUIDO").subscribe(data => {
        for (let index = 0; index < data.agendamentos.length; index++) {
          const element = data.agendamentos[index];
          if(element.status == 'CONCLUIDO'){
            this.currentItems.push(element);
          }        
      }
      },err =>{
        this.tabs.addItem()
      });
    }
  
    public openItem(item: Item) {
      this.navCtrl.push('ItemDetailPage', {
        item: item
      });
    }
}
