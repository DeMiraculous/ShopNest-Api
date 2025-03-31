import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
import { UserRepository, } from "../repository/user.repository";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { LoggedInUser } from "../auth.types";

@Injectable()
export class UserService {
    logger: Logger
    constructor(
        private userRepoitory: UserRepository,
        private jwtService: JwtService,
    ) {
        this.logger = new Logger(UserService.name);
    }

    //signUp a user
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
    //Login a user
    async login(loginUserDto: LoginUserDto): Promise<LoggedInUser> {
        const { email, password } = loginUserDto;

        const user = await this.userRepoitory.findUserByEmail(
            email.toLocaleLowerCase()
        );

        if (!user) {
            throw new NotFoundException("User not Found!");
        }

        const isPasswordValid: Boolean = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException("Incorrect Password");
        }

        const userData: LoggedInUser = {
            id: user.id,
            email: user.email,
            name: user.email,
        }
        const login_Time = new Date().toLocaleString();
        const token = await this.jwtService.signAsync(userData);
        return {
            ...userData,
            token
        }
    }
}