import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

/*
  Generated class for the AgendamentoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendamentoProvider {
  
  constructor(public api: Api) { }
  

  buscarTodos(idUsuario: number, tokenUsuario: string) {

    var header = {
      headers: new HttpHeaders()
        .set('token', tokenUsuario)
     }
     
    return this.api.get(`agendamentos/usuarios/${idUsuario}`, null, header ).map(res => {
         
        return res;
    })

    
    }
  

    salvarAgendamento(agendamentoInfo: any) {
    let seq = this.api.post('agendamentos', agendamentoInfo).share();

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
