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
var CartService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_repository_1 = require("../repository/cart.repository");
let CartService = CartService_1 = class CartService {
    cartRepository;
    logger;
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
        this.logger = new common_1.Logger(CartService_1.name);
    }
    async addToCart(userId, data) {
        return this.cartRepository.addToCart(userId, data);
    }
    async getCart(userId) {
        return this.cartRepository.getCart(userId);
    }
    async removeFromCart(userId, productId) {
        return this.cartRepository.removeFromCart(userId, productId);
    }
    async getSingleCartItem(userId, productId) {
        return this.cartRepository.getSingleCartItem(userId, productId);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = CartService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository])
], CartService);
//# sourceMappingURL=cart.service.js.map