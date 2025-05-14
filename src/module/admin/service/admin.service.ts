import { Injectable } from "@nestjs/common";
import { PromoteUserDto } from "../dto/admin.dto";
import { AdminRepository } from "../repository/admin.repository";

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepository) {}

  findAllUsers() {
    return this.adminRepo.findAllUsers();
  }

  findAllOrders() {
    return this.adminRepo.findAllOrders();
  }

  promoteUser(userId: string, dto: PromoteUserDto) {
    return this.adminRepo.promoteUser(userId, dto.role);
  }

  deleteUser(userId: string) {
    return this.adminRepo.deleteUser(userId);
  }
}