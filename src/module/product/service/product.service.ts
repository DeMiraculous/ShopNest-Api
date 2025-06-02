import { Injectable, Logger, NotFoundException, Query } from "@nestjs/common";
import { ProductRepository } from "../repository/product.repository";
import { CreateProductDto } from "../dto/product.dto";
import { v2 as cloudinary } from 'cloudinary';
import toStream from 'streamifier';
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
  async createProduct(
    userId: string,
    data: CreateProductDto,
    file: Express.Multer.File
  ) {
    let imageUrl = data.imageUrl;
    if (file) {
      imageUrl = await this.uploadToCloudinary(file);
    }

    return this.productRepository.createProduct(userId, data);
  }
  /**
   * function to upload a file to cloudinary
   * @returns the url of the uploaded image
   */
  async uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) return reject(error);
          if (!result || !result.secure_url) {
            return reject(new Error("Cloudinary upload failed or result is undefined"));
          }
          resolve(result.secure_url);
        }
      );
      toStream(file.buffer).pipe(uploadStream); //converts buffer provided by mutler to a readable stream needed by cloudinary
    });
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