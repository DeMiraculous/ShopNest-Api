import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/module/product/dto/product.dto';
import { VendorRepository } from '../repository/vendor.repository';
import { UserRepository } from 'src/module/auth/repository/user.repository';


@Injectable()
export class VendorService {
    constructor(
        private readonly vendorRepo: VendorRepository,
        private readonly userRepo: UserRepository,
    ) { }
    /**
     * Vendor creates product
     * @param userId 
     * @param dto 
     * @returns 
     */
    async createProduct(vendorId: string, dto: CreateProductDto) {
        return await this.vendorRepo.createProduct(vendorId, dto);
    }
    /**
     * Vendor gets his given product by it's product
     * @param LoggedInUser
     * @returns 
     */
    async getMyProducts(vendorId: string) {
        const user = await this.userRepo.findUserById(vendorId);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        if (user.role !== 'VENDOR') {
            throw new ForbiddenException('Only vendors can access this resource.');
        }
        return this.vendorRepo.findMyProducts(vendorId);
    }
    /**
     * Vendor update a given product by it's product
     * @param LoggedInUser
     * @returns 
     */
    updateMyProduct(productId: string, vendorId: string, dto: UpdateProductDto) {
        return this.vendorRepo.updateMyProduct(productId, vendorId, dto);
    }
    /**
 * Vendor deletes a given product by it's product
 * @param LoggedInUser
 * @returns 
 */
    deleteMyProduct(productId: string, vendorId: string) {
        return this.vendorRepo.deleteMyProduct(productId, vendorId);
    }
}
