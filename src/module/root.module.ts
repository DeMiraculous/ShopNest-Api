import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";

/**
 * The RootModule is the entry point of the application.
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        ProductModule
    ],
    controllers: [],
    providers: [],
})
export class RootModule { }