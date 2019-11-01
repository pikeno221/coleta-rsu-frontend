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
  
  private header = {
    headers: new HttpHeaders()
      .set('token', "123")
   }

  buscarTodos(idUsuario: number, dataInicio:string, dataFim: string, situacao:string) {

    
     
    return this.api.get(`agendamentos/usuarios/${idUsuario}?dataInicio=${dataInicio}&dataFim=${dataFim}&filtro=${situacao}`, null, this.header ).map(res => {
         
        return res;
    })

    
    }

    buscarTodosAdmin() {
      return this.api.get(`agendamentos`, null, this.header ).map(res => {
          return res;
      })
    }
  

    salvarAgendamento(agendamentoInfo: any) {
      
    let seq = this.api.post('agendamentos', agendamentoInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the o agendamento as realizado
      return res
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  CancelarAgendamento(agendamento:any){
    let seq = this.api.post(`agendamentos`, agendamento).share();
    seq.subscribe(res => {
         
      return res;
  },err => {
    console.error('ERROR', err);
  })
  }
  AtualizarAgendamento(agendamento:any){
    let seq = this.api.patch(`agendamentos/${agendamento.id}`, {statusColeta: agendamento.status},this.header).share();
    seq.subscribe(res => {

      return res;
  },err => {
    console.error('ERROR', err);
  })
  }

}
