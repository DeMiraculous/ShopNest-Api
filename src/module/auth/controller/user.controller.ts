import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto, } from "../dto/user.dto";
import { UserService } from "../service/user.service";

@Controller('Auth')
export class AuthController {
    constructor(private userService: UserService) { }
    @Post("signup")
    async userSignUp(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.userSignUp(createUserDto);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.userService.login(body);
    }
}