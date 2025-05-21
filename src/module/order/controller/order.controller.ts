import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { LoggedInUser } from "src/module/auth/decorators/loggedInUser.decorator";
import { SwaggerApiTagsEnum } from "src/module/common/common.enums";
import { CreateOrderDto } from "../dto/order.dto";
import { OrderService } from "../service/order.service";

@Controller('cart')
@ApiTags(SwaggerApiTagsEnum.ORDER)
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) { }
    /**
     * make an order
 * @param CreateOrderDto 
 * @returns 
 */
    @Post()
    createOrder(
        @LoggedInUser() userId: string,
        @Body() data: CreateOrderDto
    ) {
        return this.orderService.createOrder(userId, data);
    }
    /**
     * Get user order
 * @param CreateOrderDto 
 * @returns 
 */
    @Get()
    getUserOrders(@LoggedInUser() userId: string) {
        return this.orderService.getUserOrders(userId);
    }
}