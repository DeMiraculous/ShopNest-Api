import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { CreateUserDto } from "../dto/user.dto";
import { UserRepository, } from "../repository/user.repository";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    logger: Logger
    constructor(
        private userRepoitory: UserRepository,
        private jwtService: JwtService,
    ) {
        this.logger = new Logger(UserService.name);
    }
    async userSignUp(createUserDto: CreateUserDto): Promise<User> {
        let { email, password, } = createUserDto;
        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = this.userRepoitory.findUserByEmail(email);

        if (!existingUser) {
            return this.userRepoitory.createUser(createUserDto);
        }
        else {
            throw new ConflictException("User already exist");
        }
    }
}