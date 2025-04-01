import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/common/base.repository";
import { CreateUserDto } from "../dto/user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository extends BaseRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });

    }

    async createUser(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...createUserDto
            },
        });
    }
}