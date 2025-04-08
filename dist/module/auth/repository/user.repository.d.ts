import { BaseRepository } from "src/module/common/base.repository";
import { CreateUserDto } from "../dto/user.dto";
import { User } from "@prisma/client";
export declare class UserRepository extends BaseRepository {
    findUserByEmail(email: string): Promise<User | null>;
    createUser(createUserDto: CreateUserDto): Promise<{
        name: string | null;
        email: string;
        password: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
