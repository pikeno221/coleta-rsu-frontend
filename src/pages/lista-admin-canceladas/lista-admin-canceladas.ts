-Aimport { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Settings, Usuario } from '../../providers';
import { Item } from '../../models/item';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsAdminPage } from '../tabs-admin/tabs-admin';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the usuario to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'lista-admin-canceladas.html'
})
export class ListaAdminCanceladasPage {
  data: { dataAgendada: string, dataAgendadaFim: string} = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
  currentItems: Item[] = [];
  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public agendamento:AgendamentoProvider,
    public usuario: Usuario,
    public tabs: TabsAdminPage) {
      //this.BindList();
    
    }
  
    ionViewDidLoad() {
    }

    ionViewWillEnter() {
      this.BindList();
    }
  
    public BindList(item?:any){
      this.currentItems = []; 
      this.data.dataAgendada = item ? `${new Date(item.dataAgendada).getUTCDate()}/${new Date(item.dataAgendada).getUTCMonth()+1}/${new Date(item.dataAgendada).getUTCFullYear()}` : this.data.dataAgendada;
      this.data.dataAgendadaFim = item ? `${new Date(item.dataAgendadaFim).getUTCDate()}/${new Date(item.dataAgendadaFim).getUTCMonth()+1}/${new Date(item.dataAgendadaFim).getUTCFullYear()}` : this.data.dataAgendadaFim;
      this.agendamento.buscarTodosAdmin(this.data.dataAgendada, this.data.dataAgendadaFim, "CANCELADO").subscribe(data => {
        for (let index = 0; index < data.agendamentos.length; index++) {
          const element = data.agendamentos[index];
          if(element.status == 'CANCELADO'){
            this.currentItems.push(element);
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
    // cancela agendamento
    
}
