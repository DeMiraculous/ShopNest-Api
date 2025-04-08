import { Injectable, Logger } from "@nestjs/common";
import { CreateOrderDto } from "../dto/order.dto";
import { OrderRepository } from "../repository/order.repository";

@Injectable()
export class OrderService {
    logger: Logger
    constructor(private orderRepository: OrderRepository) {
        this.logger = new Logger(OrderService.name)
    }

    async createOrder(userId: string, data: CreateOrderDto) {
        return this.orderRepository.createOrder(userId, data);
    }

    async getUserOrders(userId: string) {
        return this.orderRepository.getUserOrders(userId);
    }
}