import { Logger } from "@nestjs/common";
import { CreateOrderDto } from "../dto/order.dto";
import { OrderRepository } from "../repository/order.repository";
export declare class OrderService {
    private orderRepository;
    logger: Logger;
    constructor(orderRepository: OrderRepository);
    createOrder(userId: string, data: CreateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    getUserOrders(userId: string): Promise<({
        orderItems: {
            id: string;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
}
