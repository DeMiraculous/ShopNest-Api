"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("../../common/base.repository");
let CartRepository = class CartRepository extends base_repository_1.BaseRepository {
    async addToCart(userId, data) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
            });
        }
        const existingItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: data.productId,
            },
        });
        if (existingItem) {
            throw new common_1.BadRequestException("item already exist in cart");
        }
        return this.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: data.productId,
                quantity: data.quantity,
            },
        });
    }
    async getCart(userId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                user: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async getSingleCartItem(userId, productId) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found for user');
        }
        const cartItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
            include: {
                product: true,
            },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        return cartItem;
    }
    async removeFromCart(userId, productId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            return null;
        return this.prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
                productId,
            },
        });
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, common_1.Injectable)()
], CartRepository);
//# sourceMappingURL=cart.repository.js.map