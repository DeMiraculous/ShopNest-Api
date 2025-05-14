import { BaseRepository } from "src/module/common/base.repository";
import { CreateOrderDto } from "../dto/order.dto";
export declare class OrderRepository extends BaseRepository {
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
    private calculateTotalPrice;
    private getProductPrice;
}
