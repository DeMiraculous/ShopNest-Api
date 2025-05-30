import { Body, Controller, Param, Post } from "@nestjs/common";

import { CreateUserDto, ResetPasswordDto, } from "../dto/user.dto";
import { UserService } from "../service/user.service";
import { SkipAuth } from "../skip-auth.decorator";

@Controller('Auth')
export class UserController {
    constructor(private userService: UserService) { }
    /**
     * @param createUserDto 
     * @returns 
     */
    @Post("signup")
    async userSignUp(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.userSignUp(createUserDto);
    }
    /**
     * reset password
 * @param resetPasswordDto
 * @returns 
 */
    @Post("reset-password/:otp")
    @SkipAuth()
    async resetPassword(
        @Param("otp") password_reset_otp: string,
        @Body() resetPasswordDto: ResetPasswordDto
    ): Promise<string> {
        return this.userService.createNewPassword({
            password_reset_otp,
            resetPasswordDto
        });
    }
    /**
     * login a user 
     * @returns 
     */
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.userService.login(body);
    }
}