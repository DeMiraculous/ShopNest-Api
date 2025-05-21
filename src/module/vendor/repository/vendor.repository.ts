import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/module/common/base.repository';
import { CreateProductDto, UpdateProductDto } from 'src/module/product/dto/product.dto';



@Injectable()
export class VendorRepository extends BaseRepository {

    /**
     * Vendor creates product
     * @param userId 
     * @param dto 
     * @returns 
     */
    async createProduct(userId: string, dto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                ...dto,
                userId,
            },
        });
    }
    /**
     * Vendor gets his given product by it's product
     * @param LoggedInUser
     * @returns 
     */
    async findMyProducts(vendorId: string) {
        return this.prisma.product.findMany({
            where: { vendorId },
        });
    }
    /**
     * Vendor update a given product by it's product
     * @param LoggedInUser
     * @returns 
     */
    async updateMyProduct(
        productId: string,
        vendorId: string,
        dto: UpdateProductDto
    ) {
        return this.prisma.product.updateMany({
            where: { id: productId, vendorId },
            data: dto,
        });
    }
    /**
 * Vendor deletes a given product by it's product
 * @param LoggedInUser
 * @returns 
 */
    async deleteMyProduct(productId: string, vendorId: string) {
        return this.prisma.product.deleteMany({
            where: { id: productId, vendorId },
        });
    }
}
