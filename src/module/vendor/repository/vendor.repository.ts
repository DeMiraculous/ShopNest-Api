import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/module/common/base.repository';
import { CreateProductDto, UpdateProductDto } from 'src/module/product/dto/product.dto';



@Injectable()
export class VendorRepository extends BaseRepository {


    async createProduct(userId: string, dto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                ...dto,
                userId,
            },
        });
    }

    async findMyProducts(vendorId: string) {
        return this.prisma.product.findMany({
            where: { vendorId },
        });
    }

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

    async deleteMyProduct(productId: string, vendorId: string) {
        return this.prisma.product.deleteMany({
            where: { id: productId, vendorId },
        });
    }
}
