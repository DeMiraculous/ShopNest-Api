import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "../auth/auth.guard";
import { ProductService } from "./service/product.service";
import { ProductRepository } from "./repository/product.repository";
import { ProductController } from "./controller/product.controller";

/**
 * The AuthModule is responsible for handling product related files.
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
        //   {
        //     provide: APP_GUARD,
        //     useClass: RolesGuard,
        //   },

        ProductService,
        ProductRepository,
    ],
    controllers: [ProductController],
})
export class ProductModule { }