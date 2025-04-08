"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../repository/product.repository");
let ProductService = ProductService_1 = class ProductService {
    productRepository;
    logger;
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.logger = new common_1.Logger(ProductService_1.name);
    }
    async createProduct(data) {
        return this.productRepository.createProduct(data);
    }
    async getAllProducts() {
        return this.productRepository.getAllProducts();
    }
    async getProductById(id) {
        const product = await this.productRepository.getProductById(id);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return product;
    }
    async updateProduct(id, data) {
        return this.productRepository.updateProduct(id, data);
    }
    async deleteProduct(id) {
        return this.productRepository.deleteProduct(id);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductService);
//# sourceMappingURL=product.service.js.map