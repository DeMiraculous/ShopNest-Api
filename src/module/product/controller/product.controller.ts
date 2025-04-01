import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { ProductService } from '../service/product.service';


@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: Partial<CreateProductDto>) {
    return this.productsService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
