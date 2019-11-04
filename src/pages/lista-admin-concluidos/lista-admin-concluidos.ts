import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { Usuario } from '../../providers';
import { Item } from '../../models/item';
import { TabsAdminPage } from '../tabs-admin/tabs-admin';

/**
 * Generated class for the ListaConcluidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-concluidos',
  templateUrl: 'lista-admin-concluidos.html',
})
export class ListaAdminConcluidosPage {
  data: { dataAgendada: string, dataAgendadaFim: string} = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public usuario: Usuario, public agendamento: AgendamentoProvider, public tabs:TabsAdminPage) {
    //this.BindList()
  }
  currentItems: Item[] = [];
  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.BindList();
  }

  public BindList(item?:any){
    this.currentItems = [];
    this.data.dataAgendada = item ? `${new Date(item.dataAgendada).getUTCDate()}/${new Date(item.dataAgendada).getUTCMonth()+1}/${new Date(item.dataAgendada).getUTCFullYear()}` : this.data.dataAgendada;
    this.data.dataAgendadaFim = item ? `${new Date(item.dataAgendadaFim).getUTCDate()}/${new Date(item.dataAgendadaFim).getUTCMonth()+1}/${new Date(item.dataAgendadaFim).getUTCFullYear()}` : this.data.dataAgendadaFim;
      this.agendamento.buscarTodosAdmin(this.data.dataAgendada, this.data.dataAgendadaFim, "CONCLUIDO").subscribe(data => {
        if(data.agendamentos){
        for (let index = 0; index < data.agendamentos.length; index++) {
          const element = data.agendamentos[index];
          if(element.status == 'CONCLUIDO'){
            this.currentItems.push(element);
          }        
      }
    }
      },err =>{
        
      });
    }
  
    public openItem(item: Item) {
      this.navCtrl.push('ItemAdminDetailPage', {
        item: item
      });
    }
}
