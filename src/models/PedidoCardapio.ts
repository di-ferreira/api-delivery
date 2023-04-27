import { Cardapio } from './Cardapio';
import { Pedidos } from './Pedidos';

export class PedidoCardapio {
  id: number;
  quantidade: number;
  pedido: Pedidos;
  cardapio: Cardapio[];
  createdAt: Date;
  updateAt: Date;
}
