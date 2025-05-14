import { CreateOrderDto } from "../dto/order.dto";
import { OrderService } from "../service/order.service";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
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
