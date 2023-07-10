import { iCashRegisterRepository } from '@ProjectTypes/CashRegister/iCashRegisterService';
import {
  iItemOrder,
  iItemOrderRepository,
} from '@ProjectTypes/ItemOrder/iItemOrder';
import {
  iCreateOrder,
  iOrder,
  iOrderRepository,
} from '@ProjectTypes/Order/iOrder';
import CashRegisterRepository from '@modules/CashRegister/Repository';
import ItemOrderRepository from '@modules/OrderItem/Repository';
import AppError from '@shared/errors/AppError';
import OrderRepository from '../Repository';

class CreateOrderService {
  private orderRepository: iOrderRepository;
  private orderItemRepository: iItemOrderRepository;
  private cashRegisterRepository: iCashRegisterRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderItemRepository = new ItemOrderRepository();
    this.cashRegisterRepository = new CashRegisterRepository();
  }

  public async execute({
    customer,
    status,
    items,
    obs,
    deliveryAddress,
  }: iCreateOrder): Promise<iOrder> {
    const orderExists = await this.orderRepository.findOrderOpenByCustomer(
      customer
    );

    const cashRegister = await this.cashRegisterRepository.findOpened();

    if (!cashRegister) {
      throw new AppError('There is not already Cash Register open');
    }

    if (orderExists) {
      throw new AppError('There is already one order open this customer');
    }

    if (items.length < 1) {
      throw new AppError('Order not have a Items');
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

    const order = await this.orderRepository.create({
      customer,
      status,
      items: newItems,
      total: totalOrder,
      obs: obs && obs,
      deliveryAddress,
      cashRegister,
    });

    let savedItems: iItemOrder[] = [];

    newItems.map(async (item) => {
      let newItem: iItemOrder = await this.orderItemRepository.create({
        ...item,
        order,
      });
      console.log(
        '🚀 ~ file: CreateOrderService.ts:97 ~ CreateOrderService ~ newItems.map ~ newItem:',
        newItem
      );

      savedItems.push(newItem);
    });

    const total = await this.orderRepository.findOrdersTotalByCashRegister(
      cashRegister
    );

    const newCashRegister = await this.cashRegisterRepository.save({
      id: cashRegister.id,
      total,
      open: cashRegister.open,
      openDate: cashRegister.openDate,
      orders: [],
    });

    return { ...order, cashRegister: newCashRegister, items: savedItems };
  }
}

export default CreateOrderService;
