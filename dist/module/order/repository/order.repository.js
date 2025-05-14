"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const base_repository_1 = require("../../common/base.repository");
let OrderRepository = class OrderRepository extends base_repository_1.BaseRepository {
    async createOrder(userId, data) {
        const items = data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
        const totalPrice = await this.calculateTotalPrice(items);
        const orderItems = await Promise.all(items.map(async (item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: await this.getProductPrice(item.productId),
        })));
        return this.prisma.order.create({
            data: {
                userId,
                totalPrice,
                orderItems: {
                    create: orderItems,
                },
            },
        });
    }
    async getUserOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: { orderItems: true },
        });
    }
    async calculateTotalPrice(items) {
        const prices = await this.prisma.product.findMany({
            where: { id: { in: items.map((item) => item.productId) } },
            select: { id: true, price: true },
        });
        return items.reduce((total, item) => {
            const product = prices.find((p) => p.id === item.productId);
            return total + (product?.price || 0) * item.quantity;
        }, 0);
    }
    async getProductPrice(productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            select: { price: true },
        });
        return product?.price || 0;
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)()
], OrderRepository);
//# sourceMappingURL=order.repository.js.map