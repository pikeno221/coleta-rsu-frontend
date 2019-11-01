import { Component, ViewChild, ModuleWithComponentFactories } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { AgendamentoProvider } from '../../providers/agendamento/agendamento';
import { Usuario } from '../../providers';

// import { Coleta } from '../../providers';
// import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public agendamento: AgendamentoProvider, public usuario: Usuario) {
    this.form = formBuilder.group({
      materiaisColeta: ['', Validators.required],
      observacoesUsuario: [''],
      dataAgendada: ['', Validators.required]
      
    });
    

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  /**
   * The usuario cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The usuario is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    let dataSelecionada = new Date(this.form.value['dataAgendada']);
    this.form.value['usuario'] = this.usuario._usuario.id
    this.form.value['dataAgendada'] = dataSelecionada.getDate() + "/" + dataSelecionada.getMonth()+ "/" + dataSelecionada.getFullYear()  + " " + dataSelecionada.getHours() + ":" + dataSelecionada.getMinutes();
    this.form.value['status'] = 'AGUARDANDO_CONFICAMACAO';
    console.log(this.form.value);
    this.viewCtrl.dismiss(this.form.value);
  }
}
