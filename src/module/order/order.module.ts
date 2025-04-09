import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "../auth/auth.guard";
import { OrderService } from "./service/order.service";
import { OrderRepository } from "./repository/order.repository";
import { OrderController } from "./controller/order.controller";

/**
 * The AuthModule is responsible for handling aucart related operations.
 */
@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '3600s' },
        }),
        HttpModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },

        OrderService,
        OrderRepository,

    ],
    controllers: [OrderController],
})
export class OrderModule { }