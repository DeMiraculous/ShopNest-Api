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
    /**
     * Vendor creates product
     * @param userId 
     * @param dto 
     * @returns 
     */
    @Post('products')
    create(
        @LoggedInUser("id") userId: string,
        @Body() dto: CreateProductDto) {
        return this.vendorService.createProduct(userId, dto);
    }
    /**
     * Vendor gets his given product by it's product
     * @param LoggedInUser
     * @returns 
     */
    @Get('products')
    findMyProducts(@LoggedInUser() vendorId: string) {
        return this.vendorService.getMyProducts(vendorId);
    }
    /**
     * Vendor update a given product by it's product
     * @param LoggedInUser
     * @returns 
     */
    @Patch('products/:id')
    updateProduct(
        @Param('id') id: string,
        @Request() req,
        @Body() dto: UpdateProductDto,
    ) {
        return this.vendorService.updateMyProduct(id, req.user.id, dto);
    }
    /**
 * Vendor deletes a given product by it's product
 * @param LoggedInUser
 * @returns 
 */
    @Delete('products/:id')
    deleteProduct(@Param('id') id: string, @Request() req) {
        return this.vendorService.deleteMyProduct(id, req.user.id);
    }
}
