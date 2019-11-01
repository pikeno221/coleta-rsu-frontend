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

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuario: Usuario, public agendamento: AgendamentoProvider, public tabs:TabsAdminPage) {
    this.BindList()
  }
  currentItems: Item[] = [];
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaConcluidosPage');
  }

  public BindList(){
      this.currentItems = [];
      this.agendamento.buscarTodosAdmin().subscribe(data => {
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
      this.navCtrl.push('ItemAdminDetailPage', {
        item: item
      });
    }
}
