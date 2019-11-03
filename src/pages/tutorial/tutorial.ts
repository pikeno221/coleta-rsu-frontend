import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { Usuario } from '../../providers';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  
  title1: string = 'Bem-Vindo ao App Reciclart'
  description1: string = 'Um app criado para incentivar e viabilizar a reutilização de Resíduos Sólidos Urbanos (RSUs)'
  title2: string = 'Nossa Missão'
  description2: string = 'O nosso objetivo é trazer para a palma da mão das pessoas dicas e conteudos relacionados as melhores práticas sobre o tema RECICLAGEM. '
  title3: string = 'Alterações Climáticas'
  description3: string = 'Faça parte da mudança e contribua para que as nossas futuras gerações não sofra as consequências das irresponsabilidades ambientais'
  title4: string = 'Integração com Empresas de Recolhimento de Materiais Reutilizados'
  description4: string = 'Interaja diretamente com parceiros e conheça a trajetória de nossos parceiros. Temos lindas histórias a compartilhar.'
  title5: string = 'Pense, Use, Reuse'
  description5: string = 'Agora que Você já está contextualizado, Vamos junto conosco, entre, descubra, aprenda, compartilhe e REUTILIZE!'

  constructor(public navCtrl: NavController, public usuarioService: Usuario, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: this.title1,
            description: this.description1,
            image: 'assets/img/logo-slidebox-1.jpg',
          },
          {
            title: this.title2,
            description: this.description2,
            image: 'assets/img/logo-slidebox-2.jpg',
          },
          {
            title: this.title3,
            description: this.description3,
            image: 'assets/img/logo-slidebox-3.jpg',
          }, 
          {
            title: this.title4,
            description: this.description4,
            image: 'assets/img/logo-slidebox-4.png',
          }
        ];
      });
  }

  startApp() {
    window.localStorage.setItem("skiped", "true");
    this.navCtrl.setRoot('LoginPage', {}, {
      animate: true,
      direction: 'forward'
    });
    
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    this.usuarioService.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    })
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
