import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { ColetaProvider } from '../../providers/coleta/coleta';
// import { Coleta } from '../../providers';
// import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public coleta: ColetaProvider) {
    this.form = formBuilder.group({
      material: ['', Validators.required],
      observacoes: [''],
      dataAgendamento: ['', Validators.required]
    });
    

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    console.log('passou1');

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
    this.form.value['idUsuario'] = window.localStorage.getItem('idUsuario');
    this.form.value['situacao'] = 'Aguardando confirmação';
    console.log(this.form.value);
    this.coleta.salvarColeta(this.form.value);
    this.viewCtrl.dismiss(this.form.value);
  }
}
