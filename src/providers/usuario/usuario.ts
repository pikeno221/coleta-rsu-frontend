import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { UsuarioDTO } from '../../models/usuario.dto';
import { Observable } from 'rxjs/Rx';
import { LoginRequest } from '../../models/login.request';
import { HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../../models/login.response';
import { JsonPipe } from '@angular/common';

/**
 * Most apps have the concept of a usuario. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This usuario provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   usuario: {
 *     // usuario fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class Usuario {
  _usuario: any;

  constructor(public api: Api) { }

  findAll() : Observable<UsuarioDTO[]>{
    return this.api.getUsuario();
  }
  
  login(usuario: LoginRequest) : Observable<LoginResponse>{
    const httpOptions = {
      headers: new HttpHeaders({
      'email': usuario.email,
        'senha': usuario.senha
      })
    };
    let seq = this.api.get('usuarios/login', null, httpOptions).share();
    seq.subscribe((res: LoginResponse) => {
      // If the API returned a successful response, mark the usuario as logged in
      if (res.sucesso) {
        window.sessionStorage.setItem("login", JSON.stringify(res))
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.log('seq', seq);
      console.log('-->', err.error.mensagem);
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the usuario entered on the form.
   */
  signup(accountInfo: any) {
    console.log('accountInfo', accountInfo);
    accountInfo.tipoPessoa = 'PESSOA_FISICA';
    // mudar status quando tiver moderação de usuários.
    accountInfo.statusUsuario = 'ATIVO';
    let seq = this.api.post('usuarios', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the usuario as logged in
      
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the usuario out, which forgets the session
   */
  logout() {
    window.sessionStorage.removeItem("login")
    this._usuario = null;
  }

  /**
   * Process a login/signup response to store usuario data
   */
  _loggedIn(resp) {
    this._usuario = resp.usuario;
  }
}
