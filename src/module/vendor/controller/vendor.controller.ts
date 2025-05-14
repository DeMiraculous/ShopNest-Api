import {
    Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards
} from '@nestjs/common';
import { Roles } from 'src/module/auth/decorators/roles.decorator';
import { Role } from 'src/module/auth/roles.enum';
import { RolesGuard } from 'src/module/auth/roles.guard';
import { CreateProductDto, UpdateProductDto } from 'src/module/product/dto/product.dto';
import { VendorService } from '../service/vendor.service';
import { LoggedInUser } from 'src/module/auth/decorators/loggedInUser.decorator';


@UseGuards(RolesGuard)
@Roles(Role.VENDOR)
@Controller('vendor')
export class VendorController {
    constructor(private readonly vendorService: VendorService) { }

    @Post('products')
    create(
        @LoggedInUser("id") userId: string,
        @Body() dto: CreateProductDto) {
        return this.vendorService.createProduct(userId, dto);
    }

    @Get('products')
    findMyProducts(@Request() req) {
        return this.vendorService.getMyProducts(req.user.id);
    }

    @Patch('products/:id')
    updateProduct(
        @Param('id') id: string,
        @Request() req,
        @Body() dto: UpdateProductDto,
    ) {
        return this.vendorService.updateMyProduct(id, req.user.id, dto);
    }

    @Delete('products/:id')
    deleteProduct(@Param('id') id: string, @Request() req) {
        return this.vendorService.deleteMyProduct(id, req.user.id);
    }
}
