import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { Usuario } from '../../providers';
import { MainPage, FirstRunPage  } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the usuarioname field with or without email, make
  // sure to add it to the type
  usuario: { nomeCompleto: string, email: string, senha: string, celular: string, endereco: string, tipoPessoa: string, statusUsuario:string } = {
    nomeCompleto: '',
    email: '',
    senha: '',
    celular: '',
    endereco: '',
    tipoPessoa: "",
    statusUsuario: "",
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public usuarioService: Usuario,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our usuario service
    this.usuarioService.signup(this.usuario).subscribe((resp) => {
      this.navCtrl.push(FirstRunPage);
    }, (err) => {

      //this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
