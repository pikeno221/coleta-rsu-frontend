import { UsuarioDTO } from "./usuario.dto";

export interface LoginResponse {
    mensagem: string;
    sucesso: string;
    usuario: UsuarioDTO;
    }