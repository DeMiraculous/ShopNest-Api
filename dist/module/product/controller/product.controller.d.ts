import { CreateProductDto } from '../dto/product.dto';
import { ProductService } from '../service/product.service';
export declare class ProductController {
    private productsService;
    constructor(productsService: ProductService);
    createProduct(createProductDto: CreateProductDto): Promise<{
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
