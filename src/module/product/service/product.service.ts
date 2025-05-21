import { Injectable, Logger, NotFoundException, Query } from "@nestjs/common";
import { ProductRepository } from "../repository/product.repository";
import { CreateProductDto } from "../dto/product.dto";
import { PaginatedRecordsDto, PaginationDto } from "src/module/common/dto/paginated.dto";

@Injectable()

export class ProductService {
  logger: Logger;
  constructor(
    private productRepository: ProductRepository
  ) {
    this.logger = new Logger(ProductService.name);
  }
  /**
   * 
   * @param createProductDto create a product
   * @returns 
   */
  async createProduct(userId: string, data: CreateProductDto) {
    return this.productRepository.createProduct(userId, data);
  }
  /**
   * get all product
   * @returns 
   */
  async getAllProducts(
    paginationDto: PaginationDto,
    search?: string,
  ): Promise<PaginatedRecordsDto<any>> {
    return this.productRepository.getAllProducts(paginationDto, search);
  }
  /**
   * get all product
   * @returns 
   */
  async getProductById(id: string) {
    const product = await this.productRepository.getProductById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
 /** update a product by it's id
 * @param id
 * @returns 
 */
  async updateProduct(id: string, data: Partial<CreateProductDto>) {
    return this.productRepository.updateProduct(id, data);
  }
    /**
 * delete a product by it's id
 * @param id
 * @returns 
 */
  async deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id);
  }
}