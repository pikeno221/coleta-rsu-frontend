import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { Usuario } from '../../providers';
import { InicioPage } from '../inicio/inicio';
import { LoginResponse } from '../../models/login.response';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the usuarioname field with or without email, make
  // sure to add it to the type
  usuario: { email: string, senha: string } = {
    email: 'test@example.com',
    senha: 'test'
  };

  constructor(public navCtrl: NavController,
    public usuarioService: Usuario,
    public toastCtrl: ToastController) {
      
  }

  // Attempt to login in through our usuario service
  doLogin() {
    console.log(this.usuario);
    this.usuarioService.login(this.usuario).subscribe((resp) => {
      this.navCtrl.push('ItemDetailPage', {
        usuario: this.usuario
      });
    }, (err) => {
      let response = new LoginResponse();
      response = err.error;
      if (err.status == 0) {
        response.mensagem = 'Error ao se comunicar com o servidor';   
      }
      let toast = this.toastCtrl.create({
        message: response.mensagem,
        duration: 9000,
        position: 'top'
      });
      toast.present();
    });
   
  }
}
