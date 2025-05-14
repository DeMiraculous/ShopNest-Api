import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { AdminService } from "./service/admin.service";
import { AdminRepository } from "./repository/admin.repository";
import { AdminController } from "./controller/admin.controller";


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
      {
        provide: APP_GUARD,
        useClass: RolesGuard,
      },

    AdminService,
    AdminRepository
    ],
    controllers: [AdminController],
  })
  export class AdminModule {}