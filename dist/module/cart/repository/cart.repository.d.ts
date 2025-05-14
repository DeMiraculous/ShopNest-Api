import { BaseRepository } from "src/module/common/base.repository";
import { CreateCartDto } from "../dto/cart.dto";
export declare class CartRepository extends BaseRepository {
    addToCart(userId: string, data: CreateCartDto): Promise<{
        id: string;
        productId: string;
        quantity: number;
        cartId: string;
    }>;
    getCart(userId: string): Promise<void>;
    getSingleCartItem(userId: string, productId: string): Promise<{
        product: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            stock: number;
            category: string;
            imageUrl: string | null;
        };
    } & {
        id: string;
        productId: string;
        quantity: number;
        cartId: string;
    }>;
    removeFromCart(userId: string, productId: string): Promise<import(".prisma/client").Prisma.BatchPayload | null>;
}
