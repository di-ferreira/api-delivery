import { Enderecos } from './Enderecos';

export class Cliente {
  id: number;
  nome: string;
  telefone: string;
  endereco: Enderecos[];
  createdAt: Date;
  updateAt: Date;
}
