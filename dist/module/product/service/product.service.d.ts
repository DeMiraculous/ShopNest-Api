import { Logger } from "@nestjs/common";
import { ProductRepository } from "../repository/product.repository";
import { CreateProductDto } from "../dto/product.dto";
export declare class ProductService {
    private productRepository;
    logger: Logger;
    constructor(productRepository: ProductRepository);
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
    }>;
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
