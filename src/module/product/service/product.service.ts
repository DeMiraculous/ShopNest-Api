import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "../repository/product.repository";
import { CreateProductDto } from "../dto/product.dto";

@Injectable()

export class ProductService {
    logger: Logger;
    constructor(
        private productRepository: ProductRepository
    ) {
        this.logger = new Logger(ProductService.name);
    }

    async createProduct(data: CreateProductDto) {
        return this.productRepository.createProduct(data);
      }
    
      async getAllProducts() {
        return this.productRepository.getAllProducts();
      }
    
      async getProductById(id: string) {
        const product = await this.productRepository.getProductById(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
      }
    
      async updateProduct(id: string, data: Partial<CreateProductDto>) {
        return this.productRepository.updateProduct(id, data);
      }
    
      async deleteProduct(id: string) {
        return this.productRepository.deleteProduct(id);
      }
}