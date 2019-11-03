import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Item } from '../../models/item';
import { Items, Usuario } from '../../providers';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { TabsPage } from '../tabs/tabs';
 

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  data: { dataAgendada: string, dataAgendadaFim: string} = {
    dataAgendada: '01/01/2019',
    dataAgendadaFim: '01/12/2019'
  };
 
  currentItems: Item[] = [];
  constructor(public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public agendamento: AgendamentoProvider,
    public usuario: Usuario,
    public tabs: TabsPage,
    public toastCtrl?: ToastController) {
    this.BindList();
    //this.currentItems = this.items.query();
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
  public BindList(item?:any){
    this.currentItems = [];

    this.data.dataAgendada = item ? `${new Date(item.dataAgendada).getUTCDate()}/${new Date(item.dataAgendada).getUTCMonth()+1}/${new Date(item.dataAgendada).getUTCFullYear()}` : this.data.dataAgendada;
    this.data.dataAgendadaFim = item ? `${new Date(item.dataAgendadaFim).getUTCDate()}/${new Date(item.dataAgendadaFim).getUTCMonth()+1}/${new Date(item.dataAgendadaFim).getUTCFullYear()}` : this.data.dataAgendadaFim;
    this.agendamento.buscarTodos(this.usuario._usuario.id, this.data.dataAgendada, this.data.dataAgendadaFim, "AGENDAMENTO_CONFIRMADO").subscribe(data => {
      if(data && data.agendamentos){
      for (let index = 0; index < data.agendamentos.length; index++) {
        const element = data.agendamentos[index];
        if(element.status == 'AGENDAMENTO_CONFIRMADO'){
          this.currentItems.push(element);
        }        
      }
    }
    },err =>{
      this.tabs.addItem()
    });
  }
  // cancela agendamento
  public deleteItem(item) {
    if (item.dataAgendada >= new Date().setDate(new Date().getHours()+24))
    {
    this.agendamento.CancelarAgendamento(item.id)
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
  
  }
  else{
    let toast = this.toastCtrl.create({
      message: "Não é possivel cancelar um agendamento com menos de 24 horas de antecedencia",
      duration: 9000,
      position: 'top'
    });
   toast.present();
  }

    //this.items.delete(item);
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
