import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { CartModule } from "./cart/cart.module";
import { OrderModule } from "./order/order.module";
import { AdminModule } from "./admin/admin.module";

/**
 * The RootModule is the entry point of the application.
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        ProductModule,
        CartModule,
        OrderModule,
        AdminModule
    ],
    controllers: [],
    providers: [],
})
export class RootModule { }