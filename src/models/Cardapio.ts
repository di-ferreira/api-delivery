import { Produto } from './Produto';
import { PedidoCardapio } from './PedidoCardapio';
import { TipoCardapio } from './TipoCardapio';

export class Cardapio {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  pedidoCardapio: PedidoCardapio;
  tipoCardapio: TipoCardapio;
  produto: Produto[];
  createdAt: Date;
  updateAt: Date;
}
