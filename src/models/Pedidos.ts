import { Cliente } from './Cliente';
import { PedidoCardapio } from './PedidoCardapio';

export enum PedidoStatus {
  FILA = 'na fila',
  PRONTO = 'pronto',
  TRANSITO = 'em transito',
  ENTREGUE = 'entregue',
  CANCELADO = 'cancelado',
}

export class Pedidos {
  id: number;
  numeroPedido: string;
  cliente: Cliente;
  pedidoCardapio: PedidoCardapio;
  total: number;
  observacao: string;
  status: PedidoStatus;
  createdAt: Date;
  updateAt: Date;
}
