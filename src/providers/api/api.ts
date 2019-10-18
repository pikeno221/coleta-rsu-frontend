import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDTO } from '../../models/usuario.dto';
import { Observable } from 'rxjs';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  any: Observable<any>;

  getUsuario(): Observable<UsuarioDTO[]> {

    return this.http.get<UsuarioDTO[]>(this.url + '/usuarios');
    
  }
  url: string = 'https://projeto-coleta-rsu-backend.herokuapp.com';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    this.any = this.http.get(this.url + '/' + endpoint, reqOpts);
    return this.any;
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
