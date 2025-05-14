import { Injectable } from '@nestjs/common';
import { Role } from 'src/module/auth/roles.enum';
import { BaseRepository } from 'src/module/common/base.repository';


@Injectable()
export class AdminRepository extends  BaseRepository {

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findAllOrders() {
    return this.prisma.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: { product: true }
        }
      }
    });
  }

  async promoteUser(userId: string, role: Role) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  }

  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
