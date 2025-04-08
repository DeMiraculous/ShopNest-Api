import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "../auth/auth.guard";
import { CartService } from "./service/cart.service";
import { CartRepository } from "./repository/cart.repository";
import { CartController } from "./controller/cart.controller";

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
    //   {
    //     provide: APP_GUARD,
    //     useClass: RolesGuard,
    //   },

    CartService,
    CartRepository
    ],
    controllers: [CartController],
  })
  export class CartModule {}