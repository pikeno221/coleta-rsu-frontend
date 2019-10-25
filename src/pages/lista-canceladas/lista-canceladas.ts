import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Settings, Usuario, Items } from '../../providers';
import { Item } from '../../models/item';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';
import { ListaPage } from '../lista/lista';
import { ListaPendentesPage } from '../lista-pendentes/lista-pendentes';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the usuario to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'lista-canceladas.html'
})
export class ListaCanceladasPage {

  currentItems: Item[] = [];
  constructor(public navCtrl: NavController,
    public agendamento:AgendamentoProvider,
    public usuario: Usuario, public modalCtrl: ModalController) {
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
          if(element.status == 'CANCELADO'){
            this.currentItems.push(element);
          }        
      }
      },err =>{
      });
    }
    deleteItem(item) {
    
      console.log(item)
      item.status = "CANCELADO"
      item.usuario = item.usuario.id
      this.agendamento.CancelarAgendamento(item);
      //this.currentItems.splice(this.currentItems.indexOf(item), 1);
      var listaItemPendente = new Items();  
      var listaPendente = new ListaPendentesPage(this.navCtrl, listaItemPendente , this.modalCtrl, this.agendamento, this.usuario);
      listaPendente.BindList();
  
      var listaItemConcluido = new Items();  
      var listaConcluido = new ListaPage(this.navCtrl, listaItemConcluido , this.modalCtrl, this.agendamento, this.usuario);
      listaConcluido.BindList();
    
      this.BindList();
  
      
    }
  
    public openItem(item: Item) {
      this.navCtrl.push('ItemDetailPage', {
        item: item
      });
    }
    // cancela agendamento
    
}
