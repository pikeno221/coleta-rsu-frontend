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
    email: 'wesley@gmail.com',
    senha: '123'
  };

  constructor(public navCtrl: NavController,
    public usuarioService: Usuario,
    public toastCtrl: ToastController) {
      debugger;
      var skiped = window.localStorage.getItem("skiped");
      if (skiped == undefined)
      {
        this.navCtrl.push('TutorialPage');
      }      
  }
  ionViewDidLoad() {
    debugger;
    let usuario = window.sessionStorage.getItem("login");

      if (usuario){
        usuario = JSON.parse(usuario).usuario;
        console.log(usuario)
      
        this.usuarioService._usuario = usuario;
        this.navCtrl.push('TabsPage', {
          usuario: usuario
        });
      }
  }
  // Attempt to login in through our usuario service
  doLogin() {
    this.usuarioService.login(this.usuario).subscribe((resp) => {
      this.navCtrl.push('TabsPage', {
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
