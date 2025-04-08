import { Injectable, Logger } from "@nestjs/common";
import { CartRepository } from "../repository/cart.repository";
import { CreateCartDto } from "../dto/cart.dto";

@Injectable()
export class CartService {
    logger: Logger
    constructor(private cartRepository: CartRepository) {
        this.logger = new Logger(CartService.name)
    }

    /**
   * add to cart
   * @param loggedInUserId
   * @returns
   */
    async addToCart(userId: string, data: CreateCartDto) {
        return this.cartRepository.addToCart(userId, data);
    }

    /**
 * get a list carted item for a given user cart
 * @param loggedInUserId
 * @returns
 */
    async getCart(userId: string) {
        return this.cartRepository.getCart(userId);
    }


    async removeFromCart(userId: string, productId: string) {
        return this.cartRepository.removeFromCart(userId, productId);
    }

    /**
* get a single carted item for a given user cart
* @param loggedInUserId
* @returns
*/
    async getSingleCartItem(userId: string, productId: string) {
        return this.cartRepository.getSingleCartItem(userId, productId);
    }

}