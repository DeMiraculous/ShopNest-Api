import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/module/common/base.repository";
import { CreateProductDto } from "../dto/product.dto";
import { PageInfo, PaginatedRecordsDto, PaginationDto } from "src/module/common/dto/paginated.dto";
import { Prisma, Product } from "@prisma/client";

@Injectable()
export class ProductRepository extends BaseRepository {
    /**
     * create a product
     * @param createProductDto 
     * @returns 
     */
    async createProduct(userId: string, createProductDto: CreateProductDto): Promise<Product> {
        return await this.prisma.product.create({
            data: {
                ...createProductDto,
                userId
            }
        })
    }
    /**
     * get all product
     * @returns 
     */
    async getAllProducts(
        paginationDto: PaginationDto,
        search?: string,
    ): Promise<PaginatedRecordsDto<any>> {
        const { per_page = 25, page = 1, sortBy = 'created at', sortOrder } = paginationDto;

        const where = this.buildProductsQuery(search);
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                orderBy: {
                    [sortBy]: sortOrder,
                },
                skip: (page - 1) * per_page,
                take: per_page,
            }),
            this.prisma.product.count({ where }),
        ]);
        const totalPages = Math.ceil(total / per_page);
        const pageInfo: PageInfo = {
            total,
            currentPage: page,
            perPage: per_page,
            totalPages,
        };

        return {
            data,
            pageInfo,
        };
    }

    /**
     * helper method for search query
     * @param search 
     * @returns 
     */
    private buildProductsQuery(search?: string): Prisma.ProductWhereInput {
        const where: Prisma.ProductWhereInput = {};

        if (search) {
            where.name = {
                contains: search,
                mode: 'insensitive',
            };
        }

        return where;
    }

    /**
 * get a product by it's id
 * @param id
 * @returns 
 */
    async getProductById(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
        });
    }
    /**
 * update a product by it's id
 * @param id
 * @returns 
 */
    async updateProduct(id: string, data: Partial<CreateProductDto>) {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }
    /**
 * delete a product by it's id
 * @param id
 * @returns 
 */
    async deleteProduct(id: string) {
        return this.prisma.product.delete({
            where: { id },
        });
    }
}