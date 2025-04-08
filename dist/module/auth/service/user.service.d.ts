import { Logger } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { LoggedInUser } from "../auth.types";
export declare class UserService {
    private userRepoitory;
    private jwtService;
    logger: Logger;
    constructor(userRepoitory: UserRepository, jwtService: JwtService);
    userSignUp(createUserDto: CreateUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<LoggedInUser>;
}
