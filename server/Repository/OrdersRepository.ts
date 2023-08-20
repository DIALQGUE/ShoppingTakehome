import { readFileSync } from 'fs';

import { OrderType, Order } from '@Types';

export class OrderRepository {
  orders: Order[] = [];
  constructor() {
    this.orders = JSON.parse(readFileSync('./mock/Orders.json', 'utf8'));
    console.log('Order loaded from file successfully 🧾');
  }

  public getOrders() {
    return this.orders;
  }

  public getOrderById(id: number) {
    return this.orders.find((order) => order.id === id);
  }

  public addOrders(rawOrders: OrderType[]): Order[] {
    const newOrders: Order[] = [];
    rawOrders.forEach((rawOrder) => {
      const newOrder = this.addOrder(rawOrder);
      newOrders.push(newOrder);
    });
    return newOrders;
  }

  public addOrder(rawOrder: OrderType): Order {
    console.log('rawOrder', rawOrder);
    console.log(typeof rawOrder.products);
    const newOrder = new Order(rawOrder);
    this.orders.push(newOrder);
    return newOrder;
  }
}
