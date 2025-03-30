import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base.repository";
import { CreateUserDto } from "../dto/user.dto";

@Injectable()
export class UserRepository extends BaseRepository {
    async findUserByEmail(email: string) {
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