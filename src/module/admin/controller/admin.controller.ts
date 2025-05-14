import { Body, Delete, Get, Param, Patch } from "@nestjs/common";
import { PromoteUserDto } from "../dto/admin.dto";
import { AdminService } from "../service/admin.service";

export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('users')
    getAllUsers() {
        return this.adminService.findAllUsers();
    }

    @Get('orders')
    getAllOrders() {
        return this.adminService.findAllOrders();
    }

    @Patch('users/:id/promote')
    promoteUser(@Param('id') id: string, @Body() dto: PromoteUserDto) {
        return this.adminService.promoteUser(id, dto);
    }

    @Delete('users/:id')
    deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(id);
    }
}