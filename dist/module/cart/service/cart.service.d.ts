import { Logger } from "@nestjs/common";
import { CartRepository } from "../repository/cart.repository";
import { CreateCartDto } from "../dto/cart.dto";
export declare class CartService {
    private cartRepository;
    logger: Logger;
    constructor(cartRepository: CartRepository);
    addToCart(userId: string, data: CreateCartDto): Promise<{
        id: string;
        productId: string;
        quantity: number;
        cartId: string;
    }>;
    getCart(userId: string): Promise<void>;
    removeFromCart(userId: string, productId: string): Promise<import(".prisma/client").Prisma.BatchPayload | null>;
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
}
