import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings, Usuario } from '../../providers';
import { Item } from '../../models/item';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';

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
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public agendamento:AgendamentoProvider,
    public usuario: Usuario,
    public tabs: TabsPage) {
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
        this.tabs.addItem()
      });
    }
  
    public openItem(item: Item) {
      this.navCtrl.push('ItemDetailPage', {
        item: item
      });
    }
    // cancela agendamento
    
}