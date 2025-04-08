import { BaseRepository } from "src/module/common/base.repository";
import { CreateProductDto } from "../dto/product.dto";
export declare class ProductRepository extends BaseRepository {
    createProduct(data: CreateProductDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        stock: number;
        category: string;
        imageUrl: string | null;
    }>;
    getAllProducts(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        stock: number;
        category: string;
        imageUrl: string | null;
    }[]>;
    getProductById(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        stock: number;
        category: string;
        imageUrl: string | null;
    } | null>;
    updateProduct(id: string, data: Partial<CreateProductDto>): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        stock: number;
        category: string;
        imageUrl: string | null;
    }>;
    deleteProduct(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        stock: number;
        category: string;
        imageUrl: string | null;
    }>;
}
