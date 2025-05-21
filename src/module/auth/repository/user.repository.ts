import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/common/base.repository";
import { CreateUserDto } from "../dto/user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository extends BaseRepository {

    /**
 * @param createUserDto 
 * @returns 
 */
    async createUser(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...createUserDto
            },
        });
    }
    /**
* find user by Email
* @returns 
*/
    async findUserByEmail(
        id: string,
        email: string
    ): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }
    /**
* find user by id
* @returns 
*/
    async findUserById(
        id: string,
    ): Promise<User | null> {
        return await this.prisma.user.findUnique({ where: { id } });
    }
}