import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';


/*
  Generated class for the ColetaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ColetaProvider {
  _coleta: any;

  constructor(public api: Api) { }

  buscarTodos() {
    let seq = this.api.get('coleta');

    seq.subscribe((res: any) =>{
        if (res.status == 'success') {
            return res;
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });
  
      return seq;
    
    }
  

    salvarColeta(coletaInfo: any) {
    let seq = this.api.post('coleta', coletaInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the o agendamento as realizado
      if (res.status == 'success') {
          console.log('sucesso')
          return res;
      } else {
        console.log('erro');
        return {
dataAgendamento: '2019-10-11T22:20:00Z',
idUsuario: '1',
material: 'asdffdsa',
observacoes: 'oçiasidjfçlajkdfçlakjçldfsjlçjfalç',
situacao: 'Aguardando confirmação'
        }
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}