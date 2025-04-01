import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base.repository";
import { CreateProductDto } from "../dto/product.dto";

@Injectable()
export class ProductRepository extends BaseRepository {

    async createProduct(data: CreateProductDto) {
        return this.prisma.product.create({
            data,
        });
    }

    async getAllProducts() {
        return this.prisma.product.findMany();
    }

    async getProductById(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
        });
    }

    async updateProduct(id: string, data: Partial<CreateProductDto>) {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }

    async deleteProduct(id: string) {
        return this.prisma.product.delete({
            where: { id },
        });
    }
}