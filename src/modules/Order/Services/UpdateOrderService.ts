import { iItemOrder } from '@ProjectTypes/ItemOrder/iItemOrder';
import {
  iOrder,
  iOrderRepository,
  iUpdatedOrder,
} from '@ProjectTypes/Order/iOrder';
import { iPayment } from '@ProjectTypes/Payment/iPayment';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

class UpdateOrderService {
  private orderRepository: iOrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async execute({
    id,
    items,
    obs,
    status,
    cashRegister,
    deliveryAddress,
    payment,
  }: iUpdatedOrder): Promise<iOrder> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const CalcTotalItem = (item: iItemOrder): iItemOrder => {
      let result: iItemOrder = {
        ...item,
        total: item.menu.price * item.quantity,
      };
      return result;
    };

    const newItems: iItemOrder[] = items.map((item) => {
      if (!item.menu.active) {
        throw new AppError('Order cannot have an inactive item');
      }
      return CalcTotalItem(item);
    });

    const SumTotalTotal = (
      orderArray: iItemOrder[],
      propertyObject: string
    ) => {
      return orderArray.reduce((total: number, order: iItemOrder) => {
        return total + order[propertyObject];
      }, 0);
    };

    let totalOrder: number = 0;

    totalOrder = SumTotalTotal(newItems, 'total');

    if (payment) {
      let totalPayment: number = payment.reduce(
        (total: number, pay: iPayment) => {
          return (total += pay.value);
        },
        0
      );
      if (totalOrder !== totalPayment) {
        throw new AppError('Payment value is diferent of total order.');
      }
    }

    order.items = items;
    order.obs = obs;
    order.status = status;
    order.cashRegister = cashRegister;
    order.payment = payment;
    order.deliveryAddress = deliveryAddress;

    await this.orderRepository.save(order);

    return order;
  }
}

export default UpdateOrderService;
