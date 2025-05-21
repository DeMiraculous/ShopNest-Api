import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/common/base.repository";
import { CreateOrderDto } from "../dto/order.dto";

@Injectable()
export class OrderRepository extends BaseRepository {
    /**
      * make an order
  * @param CreateOrderDto 
  * @returns 
  */
    async createOrder(userId: string, data: CreateOrderDto) {
        const items = data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));

        const totalPrice = await this.calculateTotalPrice(items);

        const orderItems = await Promise.all(
            items.map(async (item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: await this.getProductPrice(item.productId),
            }))
        );

        return this.prisma.order.create({
            data: {
                userId,
                totalPrice,
                orderItems: {
                    create: orderItems,
                },
            },
        });
    }

    /**
     * Get user order
 * @param CreateOrderDto 
 * @returns 
 */
    async getUserOrders(userId: string) {
        return this.prisma.order.findMany({
            where: { userId },
            include: { orderItems: true },
        });
    }
//helper method to calculate total price
    private async calculateTotalPrice(items: { productId: string; quantity: number }[]) {
        const prices = await this.prisma.product.findMany({
            where: { id: { in: items.map((item) => item.productId) } },
            select: { id: true, price: true },
        });

        return items.reduce((total, item) => {
            const product = prices.find((p) => p.id === item.productId);
            return total + (product?.price || 0) * item.quantity;
        }, 0);
    }
//helper method to get product price
    private async getProductPrice(productId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            select: { price: true },
        });
        return product?.price || 0;
    }
}