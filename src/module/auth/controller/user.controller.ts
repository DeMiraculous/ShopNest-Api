import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto, } from "../dto/user.dto";
import { UserService } from "../service/user.service";

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
     * login a user 
     * @returns 
     */
    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.userService.login(body);
    }
}