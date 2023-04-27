import { Cliente } from './Cliente';

export class Enderecos {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento: string;
  cliente: Cliente;
}
