import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto, LoginUserDto, ResetPasswordDto } from "../dto/user.dto";
import { UserRepository, } from "../repository/user.repository";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
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

    /**
 * @param createUserDto 
 * @returns 
 */
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
    /**
 * reset password
* @param resetPasswordDto
* @returns 
*/
    async createNewPassword({
        password_reset_otp,
        resetPasswordDto,
    }: {
        password_reset_otp: string;
        resetPasswordDto: ResetPasswordDto;
    }): Promise<string> {
        const user = await this.userRepoitory.findUserWithToken(
            password_reset_otp
        );
        if (!user) {
            throw new NotFoundException("user not found");
        }
        if (!user.password_reset_time) {
            throw new UnauthorizedException("Otp not sent.");
        }
        const currentTime = new Date();
        const activationTime = new Date(user.password_reset_time);

        const timeDifference = currentTime.getTime() - activationTime.getTime();
        const expirationTime = 5 * 60 * 1000;

        if (timeDifference > expirationTime) {
            throw new UnauthorizedException("Reset otp has expired");
        }
        const salt: string = await bcrypt.genSalt(10);
        const hash: string = await bcrypt.hash(resetPasswordDto.password, salt);

        if (await bcrypt.compare(resetPasswordDto.password, user.password)) {
            throw new ConflictException("please use a different password");
        }
        await this, this.userRepoitory.changePassword(user.id, hash);
        //         try {
        //   await this.mailService.sendChangePasswordMail(user);
        // } catch (error) {
        //   console.log(error);
        //   Sentry.captureException(error);
        //   throw new InternalServerErrorException(
        //     "An error occurred while sending mail."
        //   );
        // }
        return "success";
    }
    /**
 * login a user 
 * @returns 
 */
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