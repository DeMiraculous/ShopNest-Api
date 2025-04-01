import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/user.repository";
import { UserController } from "./controller/user.controller";
import { HttpModule } from "@nestjs/axios";


/**
 * The AuthModule is responsible for handling authentication and authorization.
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

      UserService,
      UserRepository
    ],
    controllers: [UserController],
  })
  export class AuthModule {}