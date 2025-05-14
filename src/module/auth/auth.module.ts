import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/user.repository";
import { UserController } from "./controller/user.controller";
import { HttpModule } from "@nestjs/axios";
import { RolesGuard } from "./roles.guard";
import { AdminController } from "../admin/controller/admin.controller";


/**
 * The AuthModule is responsible for handling Admin related activity                                                                                                            .
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
      useClass: RolesGuard,
    },

    UserService,
    UserRepository
  ],
  controllers: [AdminController],
})
export class AuthModule { }