import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseRepository } from "src/module/common/base.repository";
import { CreateCartDto } from "../dto/cart.dto";


@Injectable()
export class CartRepository extends BaseRepository {
    async addToCart(userId: string, data: CreateCartDto) {
        // Check or create the user's cart
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
            });
        }

        // Check if product already exists in cart
        const existingItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: data.productId,
            },
        });

        if (existingItem) {
            throw new BadRequestException("item already exist in cart");
        }

        // Else, create new cart item
        return this.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: data.productId,
                quantity: data.quantity,
            },
        });
    }

    /**
* get a list carted item for a given user cart
* @param loggedInUserId
* @returns
*/
    async getCart(userId: string) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                user: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }

    /**
* get a single carted item for a given user cart
* @param loggedInUserId
* @returns
*/
    async getSingleCartItem(userId: string, productId: string) {
        // First, find the user's cart
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            throw new NotFoundException('Cart not found for user');
        }

        // Then, find the specific item in that cart
        const cartItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
            include: {
                product: true, 
            },
        });

        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }

        return cartItem;
    }


    async removeFromCart(userId: string, productId: string) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });

        if (!cart) return null;

        return this.prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                productId,
            },
        });
    }
}
