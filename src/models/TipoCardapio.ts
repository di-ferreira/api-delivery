import { Cardapio } from './Cardapio';

export class TipoCardapio {
  id: number;
  nome: string;
  descricao: string;
  cardapio: Cardapio[];
  createdAt: Date;
  updateAt: Date;
}
