import { Controller, Post, Get, Patch, Delete, Param, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ProductService } from '../service/product.service';
import { PaginatedRecordsDto, PaginationDto } from 'src/module/common/dto/paginated.dto';
import { LoggedInUser } from 'src/module/auth/decorators/loggedInUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';


@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) { }
  /**
   * 
   * @param createProductDto create a product
   * @returns 
   */
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'integer' },
        category: { type: 'string' },
        vendorId: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  createProduct(
    @LoggedInUser("id") userId: string,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productsService.createProduct(
      userId,
      createProductDto,
      file);
  }

  /**
   * get all product
   * @returns 
   */
  @Get()
  getAllProducts(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
  ) {
    return this.productsService.getAllProducts(paginationDto, search);
  }
  /**
 * get all product
 * @returns 
 */
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
  /** update a product by it's id
  * @param id
  * @returns 
  */
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: Partial<CreateProductDto>) {
    return this.productsService.updateProduct(id, data);
  }
  /**
* delete a product by it's id
* @param id
* @returns 
*/
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
