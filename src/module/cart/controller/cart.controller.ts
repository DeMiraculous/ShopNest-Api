import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { SwaggerApiTagsEnum } from "src/module/common/common.enums";
import { CartService } from "../service/cart.service";
import { CreateCartDto } from "../dto/cart.dto";
import { LoggedInUser } from "src/module/auth/decorators/loggedInUser.decorator";


@Controller('cart')
@ApiTags(SwaggerApiTagsEnum.CART)
@ApiBearerAuth()
export class CartController {
    constructor(private cartService: CartService) { }

    /**
     * add to cart
     * @param loggedInUserId
     * @returns
     */
    @Post()
    addToCart(
        @LoggedInUser() userId: string,
        @Body() data: CreateCartDto
    ) {
        return this.cartService.addToCart(userId, data);
    }

    /**
 * get a list carted item for a given user cart
 * @param loggedInUserId
 * @returns
 */
    @Get()
    getCart(
        @LoggedInUser() userId: string
    ) {
        return this.cartService.getCart(userId);
    }


    @Delete(':productId')
    async removeFromCart(
        @LoggedInUser() userId: string,
        @Param() productId: string
    ) {
        return this.cartService.removeFromCart(userId, productId);
    }

    /**
 * get a single carted item for a given user cart
 * @param loggedInUserId
 * @returns
 */
    @Get('item/:productId')
    async getSingleCartItem(
        @LoggedInUser() userId: string,
        @Param('productId') productId: string,
    ) {
        return this.cartService.getSingleCartItem(userId, productId);
    }

}