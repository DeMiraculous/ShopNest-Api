import { CreateUserDto } from "../dto/user.dto";
import { UserService } from "../service/user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    userSignUp(createUserDto: CreateUserDto): Promise<{
        name: string | null;
        id: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<import("../auth.types").LoggedInUser>;
}
