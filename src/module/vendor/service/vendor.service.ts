import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/module/product/dto/product.dto';
import { VendorRepository } from '../repository/vendor.repository';


@Injectable()
export class VendorService {
    constructor(private readonly vendorRepo: VendorRepository
    ) { }

    createProduct(vendorId: string, dto: CreateProductDto) {
        return this.vendorRepo.createProduct(vendorId, dto);
    }

    getMyProducts(vendorId: string) {
        return this.vendorRepo.findMyProducts(vendorId);
    }

    updateMyProduct(productId: string, vendorId: string, dto: UpdateProductDto) {
        return this.vendorRepo.updateMyProduct(productId, vendorId, dto);
    }

    deleteMyProduct(productId: string, vendorId: string) {
        return this.vendorRepo.deleteMyProduct(productId, vendorId);
    }
}
